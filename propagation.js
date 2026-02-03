// propagation.js — Server-side propagation analysis (no client-side keys)
async function analyzeAgentPropagation() {
  const username = localStorage.getItem("aigentsyUsername") || "";
  if (!username) return;

  try {
    const res = await fetch(
      `https://aigentsy-ame-runtime.onrender.com/api/propagation/${encodeURIComponent(username)}`
    );

    if (!res.ok) {
      console.warn("Propagation analysis unavailable");
      return;
    }

    const data = await res.json();
    if (data.ok && data.report) {
      localStorage.setItem("propagationReport", JSON.stringify(data.report));
      console.log("Propagation analysis complete:", data.report.length, "agents");
    }
  } catch (err) {
    console.warn("Propagation analysis error:", err.message);
  }
}

document.addEventListener("DOMContentLoaded", analyzeAgentPropagation);
