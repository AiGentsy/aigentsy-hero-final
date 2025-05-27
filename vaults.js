document.addEventListener('DOMContentLoaded', () => {
  // KPI Animations
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

  // Vaults Chart
  const ctx = document.getElementById('chart')?.getContext('2d');
  if (ctx) {
    const dataSets = [
      {
        label: 'Total Vaults',
        data: [120, 180, 300, 400, 470, 530],
        backgroundColor: 'rgba(0,240,255,0.4)',
        borderColor: '#00f0ff',
      },
      {
        label: 'Remixable Vaults',
        data: [80, 130, 210, 280, 300, 320],
        backgroundColor: 'rgba(166,77,255,0.4)',
        borderColor: '#a64dff',
      },
      {
        label: 'Avg Vault Yield',
        data: [4.1, 4.8, 5.2, 5.6, 6.1, 6.4],
        backgroundColor: 'rgba(0,255,178,0.4)',
        borderColor: '#00ffb2',
      },
      {
        label: 'Vaults Closed',
        data: [5, 8, 30, 90, 170, 244],
        backgroundColor: 'rgba(247,183,51,0.4)',
        borderColor: '#f7b733',
      },
      {
        label: 'Vaults with Agent Stakes',
        data: [300, 540, 740, 980, 1210, 1582],
        backgroundColor: 'rgba(255,28,247,0.4)',
        borderColor: '#ff1cf7',
      },
      {
        label: 'Top Performing Vault',
        data: [40000, 55000, 70000, 83000, 97000, 109400],
        backgroundColor: 'rgba(110,255,232,0.4)',
        borderColor: '#6effe8',
      }
    ];

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: dataSets
      },
      options: {
        plugins: {
          legend: { labels: { color: 'white' } }
        },
        scales: {
          x: {
            ticks: { color: 'white' },
            grid: { color: '#222' }
          },
          y: {
            ticks: { color: 'white' },
            grid: { color: '#222' }
          }
        }
      }
    });
  }

  // Enhancement Actions: Fork + Resell
  document.getElementById('forkVaultBtn')?.addEventListener('click', () => {
    alert('🔁 Vault Fork initiated.');
  });

  document.getElementById('resellVaultBtn')?.addEventListener('click', () => {
    alert('💸 Vault Share listed for resale.');
  });
});
