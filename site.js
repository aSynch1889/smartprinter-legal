(function () {
  var STORAGE_THEME = "sp-theme";
  var STORAGE_LANG = "sp-lang";

  function preferredTheme() {
    var saved = localStorage.getItem(STORAGE_THEME);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function preferredLang() {
    var saved = localStorage.getItem(STORAGE_LANG);
    if (saved === "en" || saved === "zh-Hans") return saved;
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("zh") === 0 ? "zh-Hans" : "en";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_THEME, theme);
    var btn = document.querySelector("[data-theme-toggle]");
    if (btn) {
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      btn.setAttribute("title", theme === "dark" ? "Light" : "Dark");
    }
  }

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem(STORAGE_LANG, lang);
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.classList.toggle("is-active", el.getAttribute("data-lang") === lang);
    });
    var meta = document.querySelector('meta[name="sp-title-' + lang + '"]');
    if (meta && meta.content) document.title = meta.content;
  }

  function init() {
    applyTheme(preferredTheme());
    applyLang(preferredLang());

    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.addEventListener("click", function () {
        applyLang(el.getAttribute("data-lang"));
      });
    });

    var themeBtn = document.querySelector("[data-theme-toggle]");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
      });
    }

    var path = location.pathname.replace(/\/+$/, "");
    document.querySelectorAll("[data-nav]").forEach(function (el) {
      var key = el.getAttribute("data-nav");
      var active = path.indexOf("/" + key) !== -1;
      el.classList.toggle("is-active", !!active);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
