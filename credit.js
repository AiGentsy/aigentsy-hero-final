document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('chart').getContext('2d');
  const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient1.addColorStop(0, 'rgba(0,255,178,0.6)');
  gradient1.addColorStop(0.5, 'rgba(0,191,255,0.3)');
  gradient1.addColorStop(1, 'rgba(0,191,255,0.1)');

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient2.addColorStop(0, 'rgba(255,0,170,0.6)');
  gradient2.addColorStop(1, 'rgba(255,0,170,0.1)');

  const gradient3 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient3.addColorStop(0, 'rgba(128,0,255,0.6)');
  gradient3.addColorStop(1, 'rgba(128,0,255,0.1)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Stake Volume',
          data: [80000, 120000, 160000, 200000, 240000, 280000],
          borderColor: '#00f0ff',
          backgroundColor: gradient1,
          fill: true,
          tension: 0.4,
          pointRadius: 0
        },
        {
          label: 'Credit Deployed',
          data: [40000, 80000, 120000, 160000, 200000, 240000],
          borderColor: '#ff1cf7',
          backgroundColor: gradient2,
          fill: true,
          tension: 0.4,
          pointRadius: 0
        },
        {
          label: 'ROI %',
          data: [2, 4, 6, 8, 10, 11.2],
          borderColor: '#a64dff',
          backgroundColor: gradient3,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          yAxisID: 'y1'
        }
      ]
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
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          position: 'left',
          beginAtZero: true,
          ticks: { color: 'white' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y1: {
          position: 'right',
          beginAtZero: true,
          grid: { drawOnChartArea: false },
          ticks: { color: '#aaa' }
        }
      }
    }
  });

  // Animate KPI roll-up
  document.querySelectorAll('.value[data-count]').forEach(el => {
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
