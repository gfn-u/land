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

  const expandButton = activeSlot.querySelector(

    "[data-artifact-expand]"

  );

  const expandedContent = activeSlot.querySelector(

    "[data-artifact-expanded]"

  );

  if (closeButton) closeButton.hidden = true;

  if (expandButton) expandButton.hidden = false;

  if (expandedContent) expandedContent.hidden = true;

  activeSlot = null;

}
    function open(slot) {

  if (activeSlot === slot) return;

  close();

  slot.classList.add("is-expanded");

  const closeButton = slot.querySelector(

    "[data-artifact-close]"

  );

  const expandButton = slot.querySelector(

    "[data-artifact-expand]"

  );

  const expandedContent = slot.querySelector(

    "[data-artifact-expanded]"

  );

  if (closeButton) closeButton.hidden = false;

  if (expandButton) expandButton.hidden = true;

  if (expandedContent) expandedContent.hidden = false;

  activeSlot = slot;

}

    function register(slot) {

  slot.addEventListener("click", (event) => {

    if (event.target.closest("[data-artifact-close]")) {

      event.stopPropagation();

      close();

      return;

    }

    if (event.target.closest("[data-artifact-expand]")) {

      event.stopPropagation();

      open(slot);

      return;

    }

    if (

      event.target.closest(

        "a, input, textarea, select, summary, button"

      )

    ) {

      return;

    }

   if (activeSlot === slot) {

  close();

} else {

  open(slot);

}

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
