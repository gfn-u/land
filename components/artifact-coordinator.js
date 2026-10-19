(function () {
  function createArtifactCoordinator(space) {
    let activeArtifact = null;

    function close() {
      if (!activeArtifact) return;

      activeArtifact.classList.remove("expanded");

      const closeButton = activeArtifact.querySelector(
        "[data-artifact-close]"
      );

      if (closeButton) closeButton.hidden = true;

      activeArtifact = null;
    }

    function open(artifact) {
      if (activeArtifact === artifact) return;

      close();

      artifact.classList.add("expanded");

      const closeButton = artifact.querySelector(
        "[data-artifact-close]"
      );

      if (closeButton) closeButton.hidden = false;

      activeArtifact = artifact;
    }

    function register(artifact) {
      artifact.addEventListener("click", (event) => {
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

        open(artifact);
      });
    }

    space.addEventListener("click", (event) => {
      if (
        activeArtifact &&
        !activeArtifact.contains(event.target)
      ) {
        close();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        activeArtifact &&
        !activeArtifact.contains(event.target)
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
