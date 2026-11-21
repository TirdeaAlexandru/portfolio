(function () {
  // Render country galleries independently of the optional map library. If Leaflet
  // or its CDN is unavailable, journal photos must still appear normally.
  const photos = window.portfolioPhotos || [];
  document.querySelectorAll("[data-country-entry]").forEach(function (section) {
    const country = section.dataset.countryEntry;
    const gallery = section.querySelector(".journal-photos");
    if (!gallery) return;
    const countryPhotos = photos.filter(function (photo) { return photo.country === country; });
    const heading = section.querySelector("h2");
    if (heading) heading.tabIndex = -1;
    countryPhotos.forEach(function (photo) {
      const link = document.createElement("a");
      const filename = photo.file.replace(/\.jpg$/i, "");
      link.id = "journal-photo-" + filename.replace(/[^a-z0-9_-]/gi, "-");
      link.href = photo.href || (photo.page + "#photo-" + filename);
      link.setAttribute("aria-label", photo.place || ("Photograph from " + country));
      const image = document.createElement("img");
      image.src = "images/" + photo.file + "?v=web-optimized-20261121";
      image.alt = photo.place ? ("" + photo.place) : ("Photograph from " + country);
      image.loading = "lazy";
      link.appendChild(image);
      gallery.appendChild(link);
    });
    if (countryPhotos.length === 0) {
      section.classList.add("journal-entry--empty");
    }
  });

  const mapElement = document.getElementById("journal-map");
  if (!mapElement || !window.L) return;

  const countries = {
    France: [46.6, 2.2],
    Italy: [42.8, 12.6],
    Luxembourg: [49.8153, 6.1296],
    Romania: [45.9, 24.9]
  };
  const map = L.map(mapElement, {
    scrollWheelZoom: false,
    zoomControl: true,
    dragging: true,
    minZoom: 3,
    maxZoom: 8
  });
  const mapBounds = L.latLngBounds([[40, 0], [58, 32]]);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);
  let selectionSequence = 0;
  let focusEffectTimer;
  function showCountryPhotos(country) {
    const entry = Array.from(document.querySelectorAll("[data-country-entry]")).find(function (section) {
      return section.dataset.countryEntry === country;
    });
    if (!entry) return;
    const heading = entry.querySelector("h2");
    const selection = ++selectionSequence;
    const main = document.querySelector("main");
    window.clearTimeout(focusEffectTimer);
    main?.classList.remove("journal-focus-active");
    document.querySelectorAll(".journal-entry--focused").forEach(function (focusedEntry) {
      focusedEntry.classList.remove("journal-entry--focused");
    });
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
    const startY = window.scrollY;
    const targetY = Math.max(0, Math.min(
      document.documentElement.scrollHeight - window.innerHeight,
      startY + entry.getBoundingClientRect().top - headerHeight - 16
    ));
    entry.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start"
    });
    if (heading) heading.focus({ preventScroll: true });
    function highlightSelection() {
      if (!heading || selection !== selectionSequence) return;
      document.querySelectorAll(".journal-entry h2.is-selected").forEach(function (selectedHeading) {
        selectedHeading.classList.remove("is-selected");
      });
      heading.classList.remove("is-selected");
      void heading.offsetWidth;
      heading.classList.add("is-selected");
      entry.classList.add("journal-entry--focused");
      main?.classList.add("journal-focus-active");
      focusEffectTimer = window.setTimeout(function () {
        main?.classList.remove("journal-focus-active");
        entry.classList.remove("journal-entry--focused");
      }, 2600);
    }
    if (reducedMotion || Math.abs(targetY - startY) < 2) {
      highlightSelection();
      return;
    }
    let lastY = startY;
    let moving = false;
    let stillFrames = 0;
    let frames = 0;
    function waitForScrollEnd() {
      if (selection !== selectionSequence) return;
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastY) > 0.5) {
        moving = true;
        stillFrames = 0;
      } else if (moving) {
        stillFrames += 1;
      }
      lastY = currentY;
      frames += 1;
      if ((moving && stillFrames >= 8) || frames >= 180) {
        highlightSelection();
      } else {
        requestAnimationFrame(waitForScrollEnd);
      }
    }
    requestAnimationFrame(waitForScrollEnd);
  }
  const mapPlaces = [
    { label: "France", labelRo: "Franța", country: "France", coords: countries.France },
    { label: "Italy", labelRo: "Italia", country: "Italy", coords: countries.Italy },
    { label: "Luxembourg", labelRo: "Luxemburg", country: "Luxembourg", coords: countries.Luxembourg },
    { label: "Romania", labelRo: "România", country: "Romania", coords: countries.Romania }
  ];
  const placeMarkers = [];
  function placeLabel(place) {
    return window.portfolioLanguage && window.portfolioLanguage() === "ro" ? place.labelRo : place.label;
  }
  mapPlaces.forEach(function (place) {
    const marker = L.circleMarker(place.coords, {
      radius: 6,
      color: "#f4f2ed",
      weight: 2,
      fillColor: "#30353a",
      fillOpacity: 1
    }).addTo(map);
    marker.bindTooltip(placeLabel(place), { direction: "top", offset: [0, -7], permanent: true });
    placeMarkers.push({ marker: marker, place: place });
    if (place.country) {
      marker.on("click", function () { showCountryPhotos(place.country); });
    }
  });
  window.addEventListener("portfolio-language-change", function () {
    placeMarkers.forEach(function (item) { item.marker.setTooltipContent(placeLabel(item.place)); });
  });

  // Fit the real map to the available panel instead of relying on a fixed zoom.
  function fitMap() {
    map.invalidateSize({ pan: false });
    map.fitBounds(mapBounds, { padding: [12, 12], maxZoom: 5 });
  }
  requestAnimationFrame(fitMap);
  window.addEventListener("resize", fitMap);

  document.querySelectorAll("[data-country-focus]").forEach(function (button) {
    button.addEventListener("click", function () {
      showCountryPhotos(button.dataset.countryFocus);
    });
  });
})();
