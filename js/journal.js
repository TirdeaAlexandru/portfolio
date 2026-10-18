(function () {
  const filters = Array.from(document.querySelectorAll("[data-city-filter]"));
  const pins = Array.from(document.querySelectorAll(".journal-pin"));
  const entries = Array.from(document.querySelectorAll("[data-city-entry]"));
  const empty = document.querySelector(".journal-empty");
  function selectCity(city) {
    let shown = 0;
    entries.forEach(function (entry) {
      const active = entry.dataset.cityEntry === city;
      entry.hidden = !active;
      if (active) shown++;
    });
    empty.hidden = shown > 0;
    filters.forEach(function (button) { button.setAttribute("aria-pressed", String(button.dataset.cityFilter === city)); });
    pins.forEach(function (pin) { pin.classList.toggle("is-active", pin.dataset.city === city); });
  }
  filters.forEach(function (button) { button.addEventListener("click", function () { selectCity(button.dataset.cityFilter); }); });
  pins.forEach(function (pin) {
    pin.addEventListener("click", function () {
      const hasPhotos = entries.some(function (entry) { return entry.dataset.cityEntry === pin.dataset.city; });
      selectCity(hasPhotos ? pin.dataset.city : "__none__");
      if (!hasPhotos) { empty.hidden = false; }
      document.querySelector(".journal-entries").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  selectCity("Venice");
})();
