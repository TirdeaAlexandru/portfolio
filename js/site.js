(function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (nav) nav.id = "primary-navigation";
  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "primary-navigation");
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

  const items = Array.from(document.querySelectorAll(".gallery a[data-full]"));
  document.querySelectorAll(".gallery img").forEach(function (image) {
    image.decoding = "async";
    function reveal() {
      image.classList.add("is-loaded");
    }
    if (image.complete && image.naturalWidth > 0) reveal();
    else {
      image.addEventListener("load", reveal, { once: true });
      image.addEventListener("error", reveal, { once: true });
    }
  });

  if (!items.length) return;

  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Photo viewer");
  box.innerHTML =
    '<button class="close" type="button" aria-label="Close">×</button>' +
    '<button class="prev" type="button" aria-label="Previous">‹</button>' +
    '<img alt="">' +
    '<button class="next" type="button" aria-label="Next">›</button>';
  document.body.appendChild(box);

  const img = box.querySelector("img");
  const closeButton = box.querySelector(".close");
  const focusable = Array.from(box.querySelectorAll("button"));
  let index = 0;
  let returnFocus = null;
  let touchStartX = 0;

  function openAt(i, moveFocus) {
    index = (i + items.length) % items.length;
    img.src = items[index].getAttribute("data-full");
    img.alt = items[index].querySelector("img").alt || "";
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
