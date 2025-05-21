(function() {
  const agentId = document.currentScript.getAttribute("data-agent");
  fetch("https://aigentsy.com/sdk-callback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      agent_id: agentId,
      timestamp: new Date().toISOString(),
      action: "external_execution"
    })
  }).then(res => {
    if (res.ok) {
      console.log("Agent SDK handshake successful for:", agentId);
    }
  }).catch(err => {
    console.error("SDK handshake failed:", err);
  });
})();
