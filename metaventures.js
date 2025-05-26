document.addEventListener('DOMContentLoaded', () => {
  // Animate KPI values
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

  // Bar Chart Setup
  const ctx = document.getElementById('chart').getContext('2d');

  const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient1.addColorStop(0, 'rgba(0,255,255,0.6)');
  gradient1.addColorStop(1, 'rgba(0,255,255,0.1)');

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient2.addColorStop(0, 'rgba(255,28,247,0.6)');
  gradient2.addColorStop(1, 'rgba(255,28,247,0.1)');

  const gradient3 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient3.addColorStop(0, 'rgba(128,0,255,0.6)');
  gradient3.addColorStop(1, 'rgba(128,0,255,0.1)');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Total Ventures',
          data: [60, 90, 140, 200, 260],
          backgroundColor: gradient1,
          borderColor: '#00f0ff',
          borderWidth: 1
        },
        {
          label: 'Real Earnings',
          data: [300000, 460000, 710000, 980000, 1420000],
          backgroundColor: gradient2,
          borderColor: '#ff1cf7',
          borderWidth: 1
        },
        {
          label: 'Clone Propagations',
          data: [2, 5, 7, 9, 11],
          backgroundColor: gradient3,
          borderColor: '#6100ff',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#ccc' }
        },
        title: {
          display: true,
          text: 'MetaVenture Expansion & Monetization',
          color: '#00f0ff',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#ccc' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          beginAtZero: true,
          ticks: { color: '#ccc' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  });
});
