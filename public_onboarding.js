// Public Onboarding — Invite Engine & Remix Sync
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get('ref');

  if (ref) {
    localStorage.setItem('referral', ref);
    const existing = JSON.parse(localStorage.getItem('refLog') || '[]');
    if (!existing.includes(ref)) {
      existing.push(ref);
      localStorage.setItem('refLog', JSON.stringify(existing));
    }
  }

  const onboardingPanel = document.querySelector('.referral-display');
  if (onboardingPanel && ref) {
    onboardingPanel.innerHTML = `
      <p>🔗 Joined via referral: <strong>${ref}</strong></p>
      <p style="font-size:0.9rem; color:#aaa;">Your yield will propagate upward once you remix or clone.</p>
    `;
  }
});
