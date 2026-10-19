/*
  GFnU ARTIFACT COORDINATOR

  Coordinates expansion without requiring
  artifacts to know about their neighbors.
*/

(function () {
  function createArtifactCoordinator(space) {
    let activeSlot = null;

    function close() {
      if (!activeSlot) return;

      activeSlot.classList.remove("is-expanded");

      const closeButton = activeSlot.querySelector(
        "[data-artifact-close]"
      );

      if (closeButton) closeButton.hidden = true;

      activeSlot = null;
    }

    function open(slot) {
      if (activeSlot === slot) return;

      close();

      slot.classList.add("is-expanded");

      const closeButton = slot.querySelector(
        "[data-artifact-close]"
      );

      if (closeButton) closeButton.hidden = false;

      activeSlot = slot;
    }

    function register(slot) {
      slot.addEventListener("click", (event) => {
        if (event.target.closest("[data-artifact-close]")) {
          event.stopPropagation();
          close();
          return;
        }

        if (
          event.target.closest(
            "a, input, textarea, select, summary, button"
          )
        ) {
          return;
        }

        open(slot);
      });
    }

    document.addEventListener("click", (event) => {
      if (
        activeSlot &&
        !activeSlot.contains(event.target)
      ) {
        close();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });

    return { register, open, close };
  }

  window.createArtifactCoordinator = createArtifactCoordinator;
})();
