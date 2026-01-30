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
          renderVersion(v);
          loadfresh();
          hwPanel("<b>Updating to " + v + "</b>", "please wait a moment...");
        }
        currentVersion = v;
      });
  }

  function renderVersion(v) {
    if (document.getElementById("version")) {
      hwapi("#version").h(v);
    } else {
      const vEl = hwapi().h(v).a(hwapi(".markdown-preview").get() || hwapi().a().get()).get();
      vEl.id = "version";
    }
  }

  loadfresh = () => {
    const url = new URL(window.location);
    url.searchParams.set('reload', Date.now());
    window.location.href = url;
  };

  checkVersion();
  setInterval(checkVersion, 30000);
});
