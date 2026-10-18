(function () {
  const button = document.querySelector("[data-theme-toggle]");
  if (!button) return;

  let theme = "light";
  try {
    theme = localStorage.getItem("portfolio-theme") || (document.body.classList.contains("home-page") ? "dark" : "light");
  } catch (_) {
    theme = document.body.classList.contains("home-page") ? "dark" : "light";
  }

  let transitionTimer;

  function applyTheme(value, animate) {
    if (animate) {
      document.documentElement.classList.add("theme-transitioning");
      window.clearTimeout(transitionTimer);
      transitionTimer = window.setTimeout(function () {
        document.documentElement.classList.remove("theme-transitioning");
      }, 760);
    }
    theme = value === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    button.setAttribute("aria-pressed", String(theme === "dark"));
    const romanian = document.documentElement.lang === "ro";
    const nextLabel = theme === "dark"
      ? (romanian ? "Activează tema luminoasă" : "Switch to light mode")
      : (romanian ? "Activează tema întunecată" : "Switch to dark mode");
    button.setAttribute("aria-label", nextLabel);
    button.title = nextLabel;
    button.querySelector(".theme-toggle-icon").textContent = theme === "dark" ? "☼" : "☾";
    try { localStorage.setItem("portfolio-theme", theme); } catch (_) {}
  }

  button.addEventListener("click", function () {
    applyTheme(theme === "dark" ? "light" : "dark", true);
  });
  document.querySelectorAll("[data-language]").forEach(function (languageButton) {
    languageButton.addEventListener("click", function () {
      window.setTimeout(function () { applyTheme(theme, false); }, 0);
    });
  });
  applyTheme(theme, false);
})();
