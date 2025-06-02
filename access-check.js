// access-check.js — AiGentsy Protocol Gatekeeper

(function enforceConsent() {
  const consent = localStorage.getItem("aigentsyUserConsent") === "true";
  const username = localStorage.getItem("aigentsyUsername") || "";
  const hasModal = document.getElementById("mintConsentModal") !== null;
  const currentPath = window.location.pathname;
  const exemptPaths = ["/mint", "/learn", "/dashboard"];

  if (!consent || !username.trim()) {
    if (hasModal && typeof showConsentModal === "function") {
      showConsentModal();
    } else if (!exemptPaths.includes(currentPath)) {
      alert("⛔ You must mint and agree to terms before accessing this page.");
      window.location.href = "/mint";
    }
  }
})();
