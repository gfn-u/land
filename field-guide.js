
/* GFnU — Shared Field Guide */

(() => {
  // Edit destinations here to update the entire website.
  const destinations = [
    {
      direction: "north",
      label: "Back to Landing",
      href: "index.html"
    },
    { 
      direction: "west", 
      label: "Acquire Goods", 
      href: "goods.html" },
    {
      direction: "east",
      label: "Participate",
      href: "participate.html"
    },
    {
      direction: "south",
      label: "Explore Knowledge",
      href: null
    }
  ];

  const isLanding = document.body.dataset.guidePage === "landing";

  // Use an existing small button, or create one.
  let button = document.querySelector(".orientation-mark");

  if (!button) {
    button = document.createElement("button");
    button.className = "orientation-mark";
    button.type = "button";
    button.setAttribute("aria-label", "Open GFnU Field Guide");
    button.title = "Open Field Guide";

    const image = document.createElement("img");
    image.src = "assets/logo/gfnu-logo-white.png";
    image.alt = "";

    button.appendChild(image);
    document.body.prepend(button);
  }

  // Build the shared compass.
  const guide = document.createElement("div");
  guide.className = "field-guide";
  guide.id = "field-guide";
  guide.hidden = true;
  guide.setAttribute("role", "dialog");
  guide.setAttribute("aria-modal", "true");
  guide.setAttribute("aria-labelledby", "field-guide-title");

  const inner = document.createElement("div");
  inner.className = "field-guide-inner";

  const closeButton = document.createElement("button");
  closeButton.className = "field-guide-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close Field Guide");
  closeButton.textContent = "×";

  const compass = document.createElement("nav");
  compass.className = "field-guide-compass";
  compass.setAttribute("aria-label", "Field Guide destinations");

  const heading = document.createElement("div");
  heading.className = "field-guide-heading";

  const symbol = document.createElement("div");
  symbol.className = "field-guide-symbol";
  symbol.setAttribute("aria-hidden", "true");
  symbol.textContent = "⧈";

  const title = document.createElement("h2");
  title.id = "field-guide-title";
  title.textContent = "GFnU – Field Guide";

  heading.append(symbol, title);
  compass.appendChild(heading);

  destinations.forEach(destination => {
    const link = document.createElement("a");
    link.className = `guide-${destination.direction}`;

    if (destination.href) {
      link.href = destination.href;
    } else {
      link.setAttribute("aria-disabled", "true");
      link.tabIndex = -1;
    }

    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");

    const arrows = {
      north: "↑",
      west: "←",
      east: "→",
      south: "↓"
    };

    arrow.textContent = arrows[destination.direction];

    if (destination.direction === "east") {
      link.append(destination.label, arrow);
    } else {
      link.append(arrow, destination.label);
    }

    compass.appendChild(link);
  });

  inner.append(closeButton, compass);
  guide.appendChild(inner);
  document.body.appendChild(guide);

  // Open and close the guide.
  let lastTrigger = null;
  let previousOverflow = "";

  function openGuide(event) {
    lastTrigger = event.currentTarget;
    previousOverflow = document.body.style.overflow;

    guide.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  function closeGuide() {
    guide.hidden = true;
    document.body.style.overflow = previousOverflow;

    if (lastTrigger) {
      lastTrigger.focus();
    }
  }

  const triggers = document.querySelectorAll(
    ".orientation-mark, .logo-button"
  );

  triggers.forEach(trigger => {
    trigger.addEventListener("click", openGuide);
  });

  closeButton.addEventListener("click", closeGuide);

  document.addEventListener("keydown", event => {
    if (guide.hidden) return;

    if (event.key === "Escape") {
      closeGuide();
      return;
    }

    if (event.key === "Tab") {
      const focusable = Array.from(
        guide.querySelectorAll(
          'button, a:not([aria-disabled="true"])'
        )
      );

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // On Landing, reveal the small button after the large logo leaves view.
  if (isLanding) {
    const originalLogo = document.querySelector(".logo");

    if (originalLogo) {
      function updateButtonVisibility() {
        const logoPosition = originalLogo.getBoundingClientRect();

        button.classList.toggle(
          "is-visible",
          logoPosition.bottom < 0
        );
      }

      window.addEventListener(
        "scroll",
        updateButtonVisibility,
        { passive: true }
      );

      updateButtonVisibility();
    }
  }
})();
