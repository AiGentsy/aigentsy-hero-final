const ctx = document.getElementById('marketChart').getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(0,255,170,0.4)');
gradient.addColorStop(0.5, 'rgba(255,0,150,0.3)');
gradient.addColorStop(1, 'rgba(120,0,255,0.2)');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Agent Earnings Growth',
      data: [5000, 10000, 15000, 21000, 27000, 30000],
      backgroundColor: gradient,
      borderColor: '#00f0ff',
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { labels: { color: 'white' } }
    },
    scales: {
      x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } }
    }
  }
});
