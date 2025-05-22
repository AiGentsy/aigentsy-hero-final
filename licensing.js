const ctx = document.getElementById('chart').getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, '#00f0ff');
gradient.addColorStop(0.5, '#ff1cf7');
gradient.addColorStop(1, '#6100ff');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Licensing Revenue (AIGx)',
      data: [1000, 2100, 3200, 4050, 4180],
      fill: true,
      backgroundColor: gradient,
      borderColor: '#00f0ff',
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.05)' }},
      y: { ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.05)' }}
    }
  }
});
