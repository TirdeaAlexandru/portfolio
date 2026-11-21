(function () {
  const groups = Array.from(document.querySelectorAll(".street-photo-group"));
  if (!groups.length) return;

  const rowSize = 1;
  let frame = 0;

  function layoutGroups() {
    if (frame) return;
    frame = window.requestAnimationFrame(function () {
      frame = 0;
      groups.forEach(function (group) {
        const gap = parseFloat(window.getComputedStyle(group).rowGap) || 0;
        group.querySelectorAll("img").forEach(function (image) {
          const tile = image.closest("a");
          if (!tile) return;

          const size = image.getBoundingClientRect();
          const declaredWidth = Number(image.getAttribute("width"));
          const declaredHeight = Number(image.getAttribute("height"));
          const renderedHeight = size.height || (size.width * declaredHeight / declaredWidth);
          if (!renderedHeight || !Number.isFinite(renderedHeight)) return;

          const rows = Math.max(1, Math.ceil((renderedHeight + gap) / (rowSize + gap)));
          tile.style.gridRowEnd = "span " + rows;
        });
        group.classList.add("is-masonry");
      });
    });
  }

  const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(layoutGroups) : null;
  groups.forEach(function (group) {
    group.querySelectorAll("img").forEach(function (image) {
      if (resizeObserver) resizeObserver.observe(image);
      image.addEventListener("load", layoutGroups, { once: true });
    });
  });

  window.addEventListener("resize", layoutGroups, { passive: true });
  layoutGroups();
})();
