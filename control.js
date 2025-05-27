document.addEventListener("DOMContentLoaded", () => {
  // 🔐 Admin Access Check
  const adminKey = localStorage.getItem("adminAccess");
  if (adminKey !== "true") {
    window.location.href = "/404"; // Redirect if unauthorized
    return;
  }

  // ✅ Admin Action Handlers
  window.approveMetaVenture = function () {
    const status = document.getElementById("log-status");
    if (status) status.textContent = "✅ MetaVenture Approved.";
  };

  window.unlockVault = function () {
    const status = document.getElementById("log-status");
    if (status) status.textContent = "🔓 Vault payout unlocked.";
  };

  window.grantLicense = function () {
    const status = document.getElementById("log-status");
    if (status) status.textContent = "📜 Tier 1 License granted.";
  };
});
