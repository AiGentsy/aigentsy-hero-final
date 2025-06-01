// Realm Renderer — MetaHive + Realms Integration
document.addEventListener('DOMContentLoaded', function () {
  const hivePanel = document.querySelector('.metahive-panel');
  const realmDisplay = document.querySelector('.realm-display');

  const connectedAgents = JSON.parse(localStorage.getItem('connectedAgents') || '[]');
  const hiveCount = connectedAgents.length;

  if (hivePanel) {
    hivePanel.innerHTML = `
      <h4>🔗 MetaHive Status</h4>
      <p>Connected Agents: ${hiveCount}</p>
      <p>${hiveCount >= 2 ? '✅ Hive structure active' : '⚠️ Add agents to form a Hive'}</p>
    `;
  }

  if (realmDisplay) {
    realmDisplay.innerHTML = `
      <div class="realm-tile">
        🌐 Current Realm: <strong>Global</strong><br/>
        👥 Agents: ${hiveCount}<br/>
        💡 Status: ${hiveCount > 1 ? 'Synced & Active' : 'Awaiting connections'}
      </div>
    `;
  }
});
