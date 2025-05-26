document.addEventListener('DOMContentLoaded', () => {
  // KPI Animation
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

  // Chart Setup
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
        label: 'Partner SDK Requests',
        data: [180, 240, 210, 310, 280, 360],
        backgroundColor: gradient,
        borderColor: '#00f0ff',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: 'white' } },
        title: {
          display: true,
          text: 'Partner SDK Requests Over Time',
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
          ticks: { color: 'white' },
          grid: { color: '#333' }
        },
        y: {
          beginAtZero: true,
          ticks: { color: 'white' },
          grid: { color: '#333' }
        }
      }
    }
  });

  // 🚧 Auto-Partnership Button Logic (stubs)
  document.querySelectorAll('.accept-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Partnership accepted and logged to ledger.');
    });
  });

  document.querySelectorAll('.counter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Counter-offer submitted.');
    });
  });

  document.querySelectorAll('.decline-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Partnership declined.');
    });
  });
});
