document.addEventListener('DOMContentLoaded', () => {
  // Animate KPI counters
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

  // Multi-line chart with 3 aligned datasets
  const ctx = document.getElementById('chart').getContext('2d');

  const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient1.addColorStop(0, 'rgba(0,255,255,0.6)');
  gradient1.addColorStop(1, 'rgba(0,255,255,0.1)');

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient2.addColorStop(0, 'rgba(166, 77, 255, 0.6)');
  gradient2.addColorStop(1, 'rgba(166, 77, 255, 0.1)');

  const gradient3 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient3.addColorStop(0, 'rgba(0, 255, 178, 0.6)');
  gradient3.addColorStop(1, 'rgba(0, 255, 178, 0.1)');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'SDK Downloads',
          data: [380, 420, 460, 510, 570, 640],
          backgroundColor: gradient1,
          borderColor: '#00f0ff',
          borderWidth: 1
        },
        {
          label: 'Enterprise Requests',
          data: [240, 280, 260, 320, 300, 360],
          backgroundColor: gradient2,
          borderColor: '#a64dff',
          borderWidth: 1
        },
        {
          label: 'Approvals Granted',
          data: [160, 190, 210, 230, 240, 270],
          backgroundColor: gradient3,
          borderColor: '#00ffb2',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: 'white' } },
        title: {
          display: true,
          text: 'Partner Access Metrics Over Time',
          color: '#00f0ff',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: { top: 10, bottom: 20 }
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

  // Partnership Ping Button Logic (stub)
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
