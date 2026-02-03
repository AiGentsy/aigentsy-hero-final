// access-check.js — AiGentsy Token-Based Auth Gatekeeper
(async function enforceAuth() {
  const currentPath = window.location.pathname;
  const exemptPaths = ["/", "/learn", "/mint", "/intake", "/start"];

  if (exemptPaths.includes(currentPath)) return;

  const token = localStorage.getItem("aigentsyToken");
  const username = localStorage.getItem("aigentsyUsername");

  if (!token || !username) {
    window.location.href = "/";
    return;
  }

  try {
    const resp = await fetch("https://aigentsy-ame-runtime.onrender.com/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });
    const result = await resp.json();
    if (!result.ok) {
      localStorage.removeItem("aigentsyToken");
      window.location.href = "/";
    }
  } catch (err) {
    // Network error — allow access rather than bricking the page
    console.warn("Auth verification unavailable:", err.message);
  }
})();
