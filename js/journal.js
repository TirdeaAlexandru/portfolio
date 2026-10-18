(function () {
  // Render the galleries independently of the optional map library. If Leaflet
  // or its CDN is unavailable, location photos must still appear normally.
  const photos = window.portfolioPhotos || [];
  document.querySelectorAll("[data-city-entry]").forEach(function (section) {
    const city = section.dataset.cityEntry;
    const gallery = section.querySelector(".journal-photos");
    if (!gallery) return;
    const cityPhotos = photos.filter(function (photo) { return photo.location === city; });
    const heading = section.querySelector("h2");
    if (heading) heading.tabIndex = -1;
    cityPhotos.forEach(function (photo) {
      const link = document.createElement("a");
      const filename = photo.file.replace(/\.jpg$/i, "");
      link.id = "journal-photo-" + filename.replace(/[^a-z0-9_-]/gi, "-");
      link.href = photo.href || (photo.page + "#photo-" + filename);
      link.setAttribute("aria-label", photo.place || ("Photograph from " + city));
      const image = document.createElement("img");
      image.src = "images/" + photo.file;
      image.alt = photo.place ? ("" + photo.place) : ("Photograph from " + city);
      image.loading = "lazy";
      link.appendChild(image);
      if (photo.place) {
        const caption = document.createElement("span");
        caption.className = "journal-photo-caption";
        caption.textContent = photo.place;
        link.appendChild(caption);
      }
      gallery.appendChild(link);
    });
    if (cityPhotos.length === 0) {
      section.classList.add("journal-entry--empty");
    }
  });

  const mapElement = document.getElementById("journal-map");
  if (!mapElement || !window.L) return;

  const cities = {
    "Galați": [45.4353, 28.0080],
    "Bucharest": [44.4268, 26.1025],
    "Venice": [45.4408, 12.3155],
    "Metz": [49.1193, 6.1757],
    "Luxembourg": [49.6116, 6.1319],
    "Nancy": [48.6921, 6.1844],
    "Constanța": [44.1792, 28.6506],
    "Danube Delta": [45.1000, 29.3000]
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
  function showCityPhotos(city) {
    const entry = Array.from(document.querySelectorAll("[data-city-entry]")).find(function (section) {
      return section.dataset.cityEntry === city;
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
    { label: "Galați · Danube Rock Revolution", labelRo: "Galați · Danube Rock Revolution", city: "Galați", coords: cities["Galați"] },
    { label: "Târgul Bujor, Galați", labelRo: "Târgul Bujor, Galați", city: "Galați", coords: [45.8667, 27.9167] },
    { label: "Bucharest · Ateneul Românesc", labelRo: "București · Ateneul Românesc", city: "Bucharest", coords: [44.4354, 26.0979] },
    { label: "Venice", labelRo: "Veneția", city: "Venice", coords: cities.Venice },
    { label: "Metz", labelRo: "Metz", city: "Metz", coords: cities.Metz },
    { label: "Luxembourg", labelRo: "Luxemburg", city: "Luxembourg", coords: cities.Luxembourg },
    { label: "Nancy", labelRo: "Nancy", city: "Nancy", coords: cities.Nancy },
    { label: "Constanța", labelRo: "Constanța", city: "Constanța", coords: cities["Constanța"] },
    { label: "Danube Delta · Delta Dunării", labelRo: "Delta Dunării", city: "Danube Delta", coords: cities["Danube Delta"] }
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
    marker.bindTooltip(placeLabel(place), { direction: "top", offset: [0, -7] });
    placeMarkers.push({ marker: marker, place: place });
    if (place.city) {
      marker.on("click", function () { showCityPhotos(place.city); });
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

  document.querySelectorAll("[data-city-focus]").forEach(function (button) {
    button.addEventListener("click", function () {
      showCityPhotos(button.dataset.cityFocus);
    });
  });
})();
