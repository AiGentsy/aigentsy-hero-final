import { protocolEvents, agentBadges } from './protocol-feed.js';

document.addEventListener('DOMContentLoaded', () => {
  // 🎯 Render Earnings Feed
  const earningsContainer = document.querySelector('.earnings-feed');
  if (earningsContainer && protocolEvents?.length) {
    let html = "<h2>Live Earnings Feed</h2>";
    protocolEvents.forEach(evt => {
      html += `<div class="feed-entry">Agent #${evt.agentId} ${evt.action} from ${evt.source}</div>`;
    });
    earningsContainer.innerHTML = html;
  }

  // 🏅 Render Badge Bar (Agent #2732 or dynamic)
  const badgeBar = document.querySelector('.badge-bar');
  const agentId = parseInt(localStorage.getItem('agentId') || '2732');
  const badges = agentBadges?.[agentId];
  if (badgeBar && badges?.length) {
    badgeBar.innerHTML = '';
    badges.forEach(badge => {
      badgeBar.innerHTML += `<div class="badge">${badge}</div>`;
    });
  }

  // 📈 Animate KPI values
  document.querySelectorAll('.value[data-count]').forEach(el => {
    const end = parseFloat(el.getAttribute('data-count'));
    let start = 0;
    const step = end / 60;
    const animate = () => {
      start += step;
      if (start < end) {
        el.textContent = end >= 1000 ? Math.floor(start).toLocaleString() : start.toFixed(1);
        requestAnimationFrame(animate);
      } else {
        el.textContent = end >= 1000 ? Math.floor(end).toLocaleString() : end.toFixed(1);
      }
    };
    animate();
  });

  // 🧠 Load My Agent Metrics from local/session storage
  const updateMyMetrics = () => {
    const userVaultKeys = localStorage.getItem('vaultKeys') || '2';
    const userRemixPasses = localStorage.getItem('remixPasses') || '1';
    const userAIGx = localStorage.getItem('aigx') || '450';
    const userClones = localStorage.getItem('cloneCount') || '3';

    document.getElementById('userVaultKeys').textContent = userVaultKeys;
    document.getElementById('userRemixPasses').textContent = userRemixPasses;
    document.getElementById('userAIGx').textContent = userAIGx;
    document.getElementById('userClones').textContent = userClones;
  };

  updateMyMetrics();
});
