/*
  GFnU ARTIFACT LOADER

  Loads independently maintained artifacts
  into the hosting page.
*/

async function loadArtifacts() {
  const slots = [
    ...document.querySelectorAll("[data-artifact]")
  ];

  const results = await Promise.all(
    slots.map(async (slot) => {
      const artifact = slot.dataset.artifact;

      if (!/^[a-z0-9-]+$/.test(artifact)) {
        console.error("Invalid artifact name:", artifact);
        return false;
      }

      try {
        const response = await fetch(
          `artifacts/${artifact}/element.html`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        slot.innerHTML = await response.text();

        slot.dispatchEvent(
          new CustomEvent("artifact:loaded", {
            bubbles: true,
            detail: { artifact }
          })
        );

        return true;
      } catch (error) {
        console.error(
          `Could not load ${artifact}:`,
          error
        );
        return false;
      }
    })
  );

  document.dispatchEvent(
    new CustomEvent("artifacts:ready", {
      detail: {
        total: slots.length,
        loaded: results.filter(Boolean).length
      }
    })
  );
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    loadArtifacts,
    { once: true }
  );
} else {
  loadArtifacts();
}
