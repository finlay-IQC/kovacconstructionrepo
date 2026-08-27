/* ==========================================================================
   Kovacs Construction Ltd — Renovation Call Funnel
   script.js — lightweight vanilla JS
   Handles: UTM capture + passthrough, smooth-scroll CTAs, sticky mobile CTA,
   FAQ accordion, footer year.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Tracking params we preserve across the funnel ---------- */
  var TRACK_KEYS = [
    "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
    "gclid", "fbclid", "ttclid", "msclkid"
  ];
  var STORE_KEY = "kovacs_utm";

  /* ---------- 1. Capture UTM / click IDs into sessionStorage ---------- */
  function captureParams() {
    var params = new URLSearchParams(window.location.search);
    var stored = readStore();
    var changed = false;

    TRACK_KEYS.forEach(function (key) {
      var val = params.get(key);
      if (val) { stored[key] = val; changed = true; }
    });

    if (changed) {
      try { sessionStorage.setItem(STORE_KEY, JSON.stringify(stored)); } catch (e) {}
    }
    return stored;
  }

  function readStore() {
    try {
      return JSON.parse(sessionStorage.getItem(STORE_KEY) || "{}");
    } catch (e) { return {}; }
  }

  /* ---------- 2. Append stored params to internal links ---------- */
  /* Keeps UTMs flowing landing.html -> thank-you.html and legal pages. */
  function decorateInternalLinks(store) {
    var query = buildQuery(store);
    if (!query) return;

    var links = document.querySelectorAll('a[href]');
    links.forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href) return;
      // Only internal .html links; skip anchors, tel:, mailto:, externals.
      if (/^(#|tel:|mailto:|https?:|\/\/)/i.test(href)) return;
      if (href.indexOf(".html") === -1) return;

      var hashSplit = href.split("#");
      var base = hashSplit[0];
      var hash = hashSplit[1] ? "#" + hashSplit[1] : "";
      var sep = base.indexOf("?") === -1 ? "?" : "&";
      a.setAttribute("href", base + sep + query + hash);
    });
  }

  function buildQuery(store) {
    var parts = [];
    TRACK_KEYS.forEach(function (key) {
      if (store[key]) {
        parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(store[key]));
      }
    });
    return parts.join("&");
  }

  /* ---------- 3. Push UTMs into the GHL form iframe ---------- */
  /* The GHL embed loads in an iframe, so we append the params to its src.
     For this to reach the CRM, add hidden fields to the form (see the comment
     in landing.html) OR rely on GHL reading query params from the iframe URL. */
  function decorateFormIframe(store) {
    var query = buildQuery(store);
    if (!query) return;
    var iframe = document.getElementById("inline-eYARpIHvsms33nY9PxDg");
    if (!iframe) return;
    var src = iframe.getAttribute("src");
    if (!src || src.indexOf("utm_") !== -1) return; // avoid double-append
    var sep = src.indexOf("?") === -1 ? "?" : "&";
    iframe.setAttribute("src", src + sep + query);
  }

  /* ---------- 4. Smooth scroll for CTA buttons ---------- */
  function initScrollCtas() {
    document.querySelectorAll(".js-scroll").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        var target = document.getElementById("form");
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  /* ---------- 5. Sticky mobile CTA — show after hero ---------- */
  function initStickyCta() {
    var bar = document.getElementById("stickyCta");
    var hero = document.getElementById("top");
    if (!bar || !hero) return;

    function toggle() {
      var past = hero.getBoundingClientRect().bottom < 0;
      bar.classList.toggle("show", past);
      bar.setAttribute("aria-hidden", past ? "false" : "true");
    }
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();
  }

  /* ---------- 6. FAQ accordion ---------- */
  function initFaq() {
    document.querySelectorAll(".faq__item").forEach(function (item) {
      var q = item.querySelector(".faq__q");
      var a = item.querySelector(".faq__a");
      if (!q || !a) return;
      q.setAttribute("aria-expanded", "false");
      q.addEventListener("click", function () {
        var isOpen = item.classList.toggle("open");
        q.setAttribute("aria-expanded", isOpen ? "true" : "false");
        a.style.maxHeight = isOpen ? a.scrollHeight + "px" : null;
      });
    });
  }

  /* ---------- 7. Footer year ---------- */
  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Init ---------- */
  function init() {
    var store = captureParams();
    decorateInternalLinks(store);
    decorateFormIframe(store);
    initScrollCtas();
    initStickyCta();
    initFaq();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
