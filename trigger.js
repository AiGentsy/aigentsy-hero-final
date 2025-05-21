function triggerLaunch() {
  const status = document.getElementById("status");
  status.textContent = "Deploying...";
  setTimeout(() => {
    status.textContent = "✅ MetaVenture successfully launched!";
  }, 2000);
}
