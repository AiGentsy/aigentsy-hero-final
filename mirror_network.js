// mirror_network.js — Enables Mirror Agent Network propagation and cross-silo visibility
document.addEventListener('DOMContentLoaded', () => {
  const agentId = localStorage.getItem('agentId') || 'unknown-agent';
  const mirrorContainer = document.getElementById('mirror-network');
  const lineage = JSON.parse(localStorage.getItem('mirrorLineage') || '[]');

  if (!mirrorContainer) return;

  // Display the current agent
  const current = document.createElement('div');
  current.innerHTML = `<strong>Your Agent ID:</strong> ${agentId}`;
  current.style.marginBottom = '12px';
  mirrorContainer.appendChild(current);

  // Display existing mirrored nodes
  if (lineage.length > 0) {
    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.paddingLeft = '0';
    lineage.forEach(node => {
      const li = document.createElement('li');
      li.innerHTML = `🪞 <strong>${node.name}</strong> — ${node.silo}`;
      li.style.marginBottom = '6px';
      list.appendChild(li);
    });
    mirrorContainer.appendChild(list);
  } else {
    mirrorContainer.innerHTML += '<em>No mirrored agents yet.</em>';
  }

  // Optional: Expose a function to add mirrors
  window.addMirrorAgent = (name, silo) => {
    const newNode = { name, silo };
    lineage.push(newNode);
    localStorage.setItem('mirrorLineage', JSON.stringify(lineage));
    location.reload();
  };
});
