 try {
      const response = await fetch(
        `artifacts/${artifact}/element.html`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const html = await response.text();
      slot.innerHTML = html;

      // Announce that the artifact is ready.
      slot.dispatchEvent(
        new CustomEvent("artifact:loaded", {
          bubbles: true,
          detail: { artifact }
        })
      );
    } catch (error) {
      console.error(`Could not load ${artifact}:`, error);
    }
  }
}

document.addEventListener("DOMContentLoaded", loadArtifacts);
