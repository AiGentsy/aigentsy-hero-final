// Auto-Stake Tracker — MetaUpgrade22 Logic
document.addEventListener('DOMContentLoaded', function () {
  const ref = localStorage.getItem('referral') || '';
  const stakeData = localStorage.getItem('staked') || 'false';
  const stakePanel = document.querySelector('.auto-stake-panel');

  if (stakePanel) {
    stakePanel.innerHTML = `
      <p><strong>Referral:</strong> ${ref || 'N/A'}</p>
      <p><strong>Staked:</strong> ${stakeData === 'true' ? '✅ Yes' : '❌ Not Yet'}</p>
      <p style="font-size:0.9rem; color:#bbb;">This agent's earnings and propagation will reflect in your vault graph if connected via remix or clone lineage.</p>
    `;
  }

  const stakeBtns = document.querySelectorAll('[data-stake]');
  stakeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      localStorage.setItem('staked', 'true');
      alert('AIGx stake recorded.');
    });
  });
});
