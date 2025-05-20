
document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('adminChart').getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(0,255,178,0.6)');
  gradient.addColorStop(0.5, 'rgba(255,0,170,0.4)');
  gradient.addColorStop(1, 'rgba(128,0,255,0.2)');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Vaults', 'Remix', 'Mint', 'Arena', 'Earn', 'Wallet'],
      datasets: [{
        label: 'Agent Actions by Silo',
        data: [420, 365, 295, 130, 208, 492],
        backgroundColor: gradient,
        borderColor: '#00bfff',
        borderWidth: 1
      }]
    },
    options: {
      plugins: { legend: { labels: { color: 'white' } } },
      scales: {
        x: { ticks: { color: 'white' }, grid: { color: '#333' }},
        y: { ticks: { color: 'white' }, grid: { color: '#333' }}
      }
    }
  });
});
