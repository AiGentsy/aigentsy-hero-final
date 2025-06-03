// access-check.js — AiGentsy Protocol Gatekeeper (Enhanced v2.1)

(function enforceConsent() {
  const consent = localStorage.getItem("aigentsyUserConsent") === "true";
  const username = localStorage.getItem("aigentsyUsername") || "";
  const entrySource = localStorage.getItem("aigentsyEntrySource") || "";
  const currentPath = window.location.pathname;
  const exemptPaths = ["/", "/learn", "/mint"]; // Minimal public paths

  // Enforce restriction on all non-exempt pages
  if (!consent || !username.trim()) {
    if (!exemptPaths.includes(currentPath)) {
      alert("⛔ You must mint and agree to terms before accessing this page.");
      window.location.href = "/mint";
      return;
    }

    // Show modal only if it exists and the function is ready
    const hasModal = typeof showConsentModal === "function" && document.getElementById("mintConsentModal");
    if (hasModal) {
      showConsentModal();
    }
  }
})();
