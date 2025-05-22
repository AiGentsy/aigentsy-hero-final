import { protocolEvents, agentBadges } from './protocol-feed.js';

document.addEventListener('DOMContentLoaded', () => {
  // Render Earnings Feed
  const earningsContainer = document.querySelector('.earnings-feed');
  if (earningsContainer) {
    let html = "<h2>Live Earnings Feed</h2>";
    protocolEvents.forEach(evt => {
      html += `<div class="feed-entry">Agent #${evt.agentId} ${evt.action} from ${evt.source}</div>`;
    });
    earningsContainer.innerHTML = html;
  }

  // Render Badge Bar (Assuming default agent = 2732 for dashboard)
  const badgeBar = document.querySelector('.badge-bar');
  const badges = agentBadges[2732];
  if (badgeBar && badges) {
    badgeBar.innerHTML = "";
    badges.forEach(badge => {
      badgeBar.innerHTML += `<div class="badge">${badge}</div>`;
    });
  }
});