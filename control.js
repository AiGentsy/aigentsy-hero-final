<script>
  document.addEventListener("DOMContentLoaded", () => {
    const adminKey = localStorage.getItem("adminAccess");
    if (adminKey !== "true") {
      // Redirect unauthorized users to 404
      window.location.href = "/404";
    }
  });
</script>
function approveMetaVenture() {
  document.getElementById("log-status").textContent = "✅ MetaVenture Approved.";
}
function unlockVault() {
  document.getElementById("log-status").textContent = "🔓 Vault payout unlocked.";
}
function grantLicense() {
  document.getElementById("log-status").textContent = "📜 Tier 1 License granted.";
}
