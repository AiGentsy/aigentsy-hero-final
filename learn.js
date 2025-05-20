
document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('chart').getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(0,255,178,0.6)');
  gradient.addColorStop(0.5, 'rgba(255,0,170,0.4)');
  gradient.addColorStop(1, 'rgba(128,0,255,0.2)');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Module 1', 'Module 2', 'Module 3', 'Module 4'],
      datasets: [{
        label: 'Learn Module Progress',
        data: [35, 58, 90, 110],
        borderColor: '#00bfff',
        backgroundColor: gradient,
        fill: true
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
