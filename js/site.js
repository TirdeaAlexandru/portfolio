(function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (nav) nav.id = "primary-navigation";
  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "primary-navigation");
    if (new URLSearchParams(window.location.search).get("mobile-preview") === "1") {
      document.body.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
    }
    toggle.addEventListener("click", function () {
      const isOpen = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  if (nav) {
    nav.addEventListener("click", function (event) {
      if (event.target instanceof Element && event.target.closest("a") && window.matchMedia("(max-width: 720px)").matches) {
        document.body.classList.remove("nav-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const drop = document.querySelector(".drop");
  if (drop) {
    const btn = drop.querySelector("button");
    btn.setAttribute("aria-haspopup", "true");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = drop.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
    document.addEventListener("click", function () {
      drop.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
    btn.setAttribute("aria-expanded", "false");
  }

  document.querySelectorAll("img[data-thumbnail-fallbacks]").forEach(function (image) {
    const fallbacks = (image.dataset.thumbnailFallbacks || "").split("|").filter(Boolean);
    image.addEventListener("error", function () {
      const next = fallbacks.shift();
      if (next) image.src = next;
    });
    if (image.complete && image.naturalWidth === 0) image.dispatchEvent(new Event("error"));
  });

  // Local file previews have no web origin for YouTube's embed player. Show
  // the video's thumbnail and a direct YouTube link until the page is hosted.
  if (window.location.protocol === "file:") {
    document.querySelectorAll(".film-player[data-video-id]").forEach(function (player) {
      const frame = player.querySelector("iframe");
      const fallback = player.querySelector(".film-fallback");
      if (frame && fallback) {
        frame.hidden = true;
        fallback.hidden = false;
      }
    });
  }

  document.querySelectorAll(".footer-signature, .intro-signature").forEach(function (image) {
    image.draggable = false;
    image.addEventListener("contextmenu", function (event) { event.preventDefault(); });
    image.addEventListener("dragstart", function (event) { event.preventDefault(); });
  });

  document.querySelectorAll(".award-certificate img").forEach(function (image) {
    image.draggable = false;
    image.addEventListener("contextmenu", function (event) { event.preventDefault(); });
    image.addEventListener("dragstart", function (event) { event.preventDefault(); });
  });

  document.querySelectorAll(".protected-photo-frame").forEach(function (frame) {
    frame.addEventListener("contextmenu", function (event) { event.preventDefault(); });
    frame.addEventListener("dragstart", function (event) { event.preventDefault(); });
  });

  const items = Array.from(document.querySelectorAll(".gallery a[data-full], .print-grid a[data-full]"));
  document.addEventListener("contextmenu", function (event) {
    if (event.target instanceof Element && event.target.closest(".gallery, .print-grid, .lightbox")) {
      event.preventDefault();
    }
  }, true);

  document.querySelectorAll(".gallery img, .print-grid img").forEach(function (image) {
    image.decoding = "async";
    image.draggable = false;
    image.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
    image.addEventListener("dragstart", function (event) {
      event.preventDefault();
    });

    function applyPaletteTone() {
      const tile = image.closest("a");
      if (!tile || !image.naturalWidth || !image.naturalHeight) return;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 24;
        canvas.height = 24;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        const hues = new Array(12).fill(0);
        let luminanceTotal = 0;
        let luminanceCount = 0;

        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i] / 255;
          const g = pixels[i + 1] / 255;
          const b = pixels[i + 2] / 255;
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const delta = max - min;
          const luminance = (max + min) / 2;
          luminanceTotal += luminance;
          luminanceCount++;
          if (delta < 0.1 || luminance < 0.12 || luminance > 0.9) continue;

          let hue;
          if (max === r) hue = 60 * (((g - b) / delta) % 6);
          else if (max === g) hue = 60 * ((b - r) / delta + 2);
          else hue = 60 * ((r - g) / delta + 4);
          if (hue < 0) hue += 360;
          const saturation = delta / (1 - Math.abs(2 * luminance - 1));
          const bucket = Math.floor(hue / 30) % hues.length;
          hues[bucket] += saturation * (0.55 + Math.min(luminance, 1 - luminance));
        }

        const strongest = Math.max(...hues);
        if (!strongest) {
          const gray = Math.round(38 + (luminanceTotal / luminanceCount) * 28);
          tile.style.setProperty("--photo-tone", "hsl(35 5% " + gray + "% )");
          return;
        }
        const hue = hues.indexOf(strongest) * 30 + 15;
        tile.style.setProperty("--photo-tone", "hsl(" + hue + " 42% 52%)");
      } catch (error) {
        tile.style.setProperty("--photo-tone", "#8c8983");
      }
    }

    function reveal() {
      image.classList.add("is-loaded");
      applyPaletteTone();
    }
    if (image.complete && image.naturalWidth > 0) reveal();
    else {
      image.addEventListener("load", reveal, { once: true });
      image.addEventListener("error", reveal, { once: true });
    }
  });

  if (!items.length) return;

  const box = document.createElement("div");
  const isRomanian = window.portfolioLanguage && window.portfolioLanguage() === "ro";
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", isRomanian ? "Vizualizator foto" : "Photo viewer");
  box.innerHTML =
    '<button class="close" type="button" aria-label="' + (isRomanian ? "Închide" : "Close") + '">×</button>' +
    '<button class="prev" type="button" aria-label="' + (isRomanian ? "Anterior" : "Previous") + '">‹</button>' +
    '<img alt="" draggable="false">' +
    '<button class="next" type="button" aria-label="' + (isRomanian ? "Următorul" : "Next") + '">›</button>' +
    '<a class="print-contact" href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=tirdea.alex2020%40gmail.com" target="_blank" rel="noopener">' + (isRomanian ? "Vrei un print sau fișierul la rezoluție maximă? Contactează-mă" : "Want a print or full-resolution file? Contact me") + "</a>";
  document.body.appendChild(box);

  const img = box.querySelector("img");
  img.draggable = false;
  img.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });
  img.addEventListener("dragstart", function (event) {
    event.preventDefault();
  });
  const printContact = box.querySelector(".print-contact");
  const closeButton = box.querySelector(".close");
  const focusable = Array.from(box.querySelectorAll("button, a[href]"));
  let index = 0;
  let returnFocus = null;
  let touchStartX = 0;

  function openAt(i, moveFocus) {
    index = (i + items.length) % items.length;
    const romanian = window.portfolioLanguage && window.portfolioLanguage() === "ro";
    box.setAttribute("aria-label", romanian ? "Vizualizator foto" : "Photo viewer");
    closeButton.setAttribute("aria-label", romanian ? "Închide" : "Close");
    box.querySelector(".prev").setAttribute("aria-label", romanian ? "Anterior" : "Previous");
    box.querySelector(".next").setAttribute("aria-label", romanian ? "Următorul" : "Next");
    printContact.textContent = romanian ? "Vrei un print sau fișierul la rezoluție maximă? Contactează-mă" : "Want a print or full-resolution file? Contact me";
    img.src = items[index].getAttribute("data-full");
    img.alt = items[index].querySelector("img").alt || "";
    const fileName = img.src.split("/").pop().replace(/\.[^.]+$/, "");
    const photoName = items[index].querySelector("img").alt || fileName;
    const compose = new URL("https://mail.google.com/mail/");
    compose.searchParams.set("view", "cm");
    compose.searchParams.set("fs", "1");
    compose.searchParams.set("to", "tirdea.alex2020@gmail.com");
    compose.searchParams.set("su", romanian ? "Întrebare despre print sau fișier foto" : "Photo print or full-resolution inquiry");
    compose.searchParams.set("body", romanian ? "Bună, sunt interesat(ă) de un print sau de fișierul la rezoluție maximă pentru fotografia „" + photoName + "”." : "Hello, I’m interested in a print or full-resolution file of “" + photoName + "”.");
    printContact.href = compose.toString();
    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (moveFocus) closeButton.focus();
  }

  function close() {
    box.classList.remove("is-open");
    document.body.style.overflow = "";
    if (returnFocus && returnFocus.isConnected) returnFocus.focus();
    returnFocus = null;
  }

  items.forEach(function (el, i) {
    el.draggable = false;
    el.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
    el.addEventListener("dragstart", function (event) {
      event.preventDefault();
    });
    el.addEventListener("click", function (e) {
      e.preventDefault();
      returnFocus = el;
      openAt(i, true);
    });
  });

  box.querySelector(".close").addEventListener("click", close);
  box.querySelector(".prev").addEventListener("click", function () {
    openAt(index - 1);
  });
  box.querySelector(".next").addEventListener("click", function () {
    openAt(index + 1);
  });
  box.addEventListener("click", function (e) {
    if (e.target === box) close();
  });
  box.addEventListener("touchstart", function (e) {
    if (e.changedTouches.length) touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (!e.changedTouches.length) return;
    const distance = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) < 55) return;
    openAt(index + (distance < 0 ? 1 : -1));
  }, { passive: true });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
      document.body.classList.remove("nav-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") {
      close();
      return;
    }
    if (e.key === "ArrowLeft") openAt(index - 1);
    if (e.key === "ArrowRight") openAt(index + 1);
    if (e.key === "Tab") {
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();
