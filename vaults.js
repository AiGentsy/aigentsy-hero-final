
document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('chart').getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(0,255,178,0.6)');
  gradient.addColorStop(0.5, 'rgba(255,0,170,0.4)');
  gradient.addColorStop(1, 'rgba(128,0,255,0.2)');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Vault Growth',
        data: [120, 200, 330, 420, 510, 600],
        backgroundColor: gradient,
        borderColor: '#00bfff',
        borderWidth: 2,
        borderRadius: 6
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: { color: 'white' }
        }
      },
      scales: {
        x: {
          ticks: { color: 'white' },
          grid: { color: '#333' }
        },
        y: {
          ticks: { color: 'white' },
          grid: { color: '#333' }
        }
      }
    }
  });

  // KPI roll-up animation
  document.querySelectorAll('.value').forEach(el => {
    const count = parseFloat(el.dataset.count);
    let i = 0;
    const inc = count / 60;
    const interval = setInterval(() => {
      i += inc;
      el.textContent = count >= 1000 ? Math.floor(i).toLocaleString() : i.toFixed(1);
      if (i >= count) {
        el.textContent = count >= 1000 ? Math.floor(count).toLocaleString() : count.toFixed(1);
        clearInterval(interval);
      }
    }, 16);
  });
});
