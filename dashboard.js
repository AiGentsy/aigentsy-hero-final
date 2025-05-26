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

  // 🏅 Render Badge Bar (Agent #2732)
  const badgeBar = document.querySelector('.badge-bar');
  const badges = agentBadges?.[2732];
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
});
