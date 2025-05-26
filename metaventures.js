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

  // Chart.js Bar Chart Setup (Vault Style)
  const ctx = document.getElementById('chart').getContext('2d');

  const gradientVentures = ctx.createLinearGradient(0, 0, 0, 300);
  gradientVentures.addColorStop(0, 'rgba(0,240,255,0.6)');
  gradientVentures.addColorStop(1, 'rgba(0,240,255,0.1)');

  const gradientEarnings = ctx.createLinearGradient(0, 0, 0, 300);
  gradientEarnings.addColorStop(0, 'rgba(166,77,255,0.6)');
  gradientEarnings.addColorStop(1, 'rgba(166,77,255,0.1)');

  const gradientClones = ctx.createLinearGradient(0, 0, 0, 300);
  gradientClones.addColorStop(0, 'rgba(0,255,178,0.6)');
  gradientClones.addColorStop(1, 'rgba(0,255,178,0.1)');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Total Ventures',
          data: [60, 90, 140, 200, 260],
          backgroundColor: gradientVentures,
          borderColor: '#00f0ff',
          borderWidth: 1
        },
        {
          label: 'Real Earnings',
          data: [300000, 460000, 710000, 980000, 1420000],
          backgroundColor: gradientEarnings,
          borderColor: '#a64dff',
          borderWidth: 1
        },
        {
          label: 'Agent Clone Propagations',
          data: [2, 5, 7, 9, 11],
          backgroundColor: gradientClones,
          borderColor: '#00ffb2',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#ccc',
            font: {
              weight: 'bold'
            }
          }
        },
        title: {
          display: true,
          text: 'MetaVenture Expansion & Monetization',
          color: '#00f0ff',
          font: {
            size: 18,
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
