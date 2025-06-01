// propagation.js

async function analyzeAgentPropagation() {
  const res = await fetch("https://api.jsonbin.io/v3/b/6839b3328960c979a5a317b5", {
    headers: {
      "X-Master-Key": "$2a$10$RNYHoP5nCS9wVlj1PizQcOfZTHPM4XA/J4LE/E.p/CuxSnxyySKRe"
    }
  });
  const data = await res.json();
  const agents = data.record;

  const now = Date.now();
  const propagationReport = [];

  agents.forEach(agent => {
    const lineageDepth = agent.cloneLineage?.split(",").length || 1;
    const mintAge = now - new Date(agent.mintTime).getTime();
    const velocity = lineageDepth / (mintAge / (1000 * 60 * 60)); // clones per hour

    const isHighVelocity = velocity > 0.2;
    const shouldMirror = isHighVelocity && agent.trait && agent.staked;

    propagationReport.push({
      id: agent.id,
      lineageDepth,
      velocity: velocity.toFixed(2),
      shouldMirror
    });
  });

  localStorage.setItem("propagationReport", JSON.stringify(propagationReport));
  console.log("MetaUpgrade22 Propagation Analysis Complete", propagationReport);
}

document.addEventListener("DOMContentLoaded", analyzeAgentPropagation);
