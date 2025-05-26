document.addEventListener('DOMContentLoaded', () => {
  // 🔁 Animate KPI Counters
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

  // 📊 Chart Setup
  const ctx = document.getElementById('chart').getContext('2d');

  const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient1.addColorStop(0, 'rgba(0,255,255,0.6)');
  gradient1.addColorStop(1, 'rgba(0,255,255,0.1)');

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient2.addColorStop(0, 'rgba(255,28,247,0.6)');
  gradient2.addColorStop(1, 'rgba(255,28,247,0.1)');

  const gradient3 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient3.addColorStop(0, 'rgba(0,255,178,0.6)');
  gradient3.addColorStop(1, 'rgba(0,255,178,0.1)');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Licenses Issued',
          data: [8, 14, 21, 33, 44],
          backgroundColor: gradient1,
          borderColor: '#00f0ff',
          borderWidth: 1
        },
        {
          label: 'SDK Deployments',
          data: [2, 5, 9, 16, 31],
          backgroundColor: gradient2,
          borderColor: '#ff1cf7',
          borderWidth: 1
        },
        {
          label: 'Licensing Revenue (AIGx)',
          data: [1000, 2100, 3200, 4050, 4180],
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
          text: 'Licensing Growth & Monetization (AIGx)',
          color: '#00f0ff',
          font: { size: 16, weight: 'bold' },
          padding: { top: 10, bottom: 20 }
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

  // 🌍 Bonus: Inject Real-World Monetization Callout
  const guide = document.querySelector('.silo-guide');
  if (guide) {
    const rwp = document.createElement('div');
    rwp.className = 'rwp-callout';
    rwp.innerHTML = `
      <h4>🔗 Real-World Monetization</h4>
      <ul>
        <li>📄 SDK tiers (1–3) represent escalating platform licensing value.</li>
        <li>💰 Revenue flows from access unlocks, protocol integrations, and co-build IP agreements.</li>
        <li>⚙️ All licensing actions are tracked on-chain and auto-bound using the Autonomous Legal Layer (ALL).</li>
        <li>🚀 Tier 3 access may trigger revenue share or hybrid ownership ventures.</li>
      </ul>
    `;
    guide.appendChild(rwp);
  }
});
