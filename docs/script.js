const vURL =
  "https://raw.githubusercontent.com/HindiWeb/math10th/main/.version";
let currentVersion;

window.addEventListener("DOMContentLoaded", function () {
  async function checkVersion() {
    fetch(vURL, {  cache: "no-store"  })
      .then((r) => r.text())
      .then((v) => {
        if(!currentVersion) renderVersion(v);
        if (currentVersion && v !== currentVersion) {
          location.reload(true);
        }
        currentVersion = v;
      });
  }

  setInterval(checkVersion, 30000);
  function renderVersion(v) {
    if (document.getElementById("version")) {
      hwapi("#version").h(v);
    } else {
      const vEl = hwapi().h(v).a(hwapi(".markdown-preview").get() || hwapi().a().get()).get();
      vEl.id = "version";
    }
  }
  checkVersion();
});
