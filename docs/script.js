window.addEventListener("DOMContentLoaded", function () {
    // fetch("https://raw.githubusercontent.com/HindiWeb/math10th/main/.version")
    //     .then((r) => r.text())
    //     .then((v) => {
    //         v = hwapi().h(v.trim()).a(hwapi(".markdown-preview").get()).get();
    //         v.id = "version";
    //     });

    const vURL =
        "https://raw.githubusercontent.com/HindiWeb/math10th/main/.version";
    let etag;
    let currentVersion;
    async function checkVersion() {
        const res = await fetch(vURL, {
            cache: "no-cache",
            headers: etag ? { "If-None-Match": etag } : {},
        });

        if (res.status === 304) return;

        if (res.ok) {
            etag = res.headers.get("etag");
            const v = (await res.text()).trim();
            if (currentVersion && v !== currentVersion) location.reload(true); // reload when currentVersion is set and version changed
            renderVersion(v);
            currentVersion = v;
        }
    }

    setInterval(checkVersion, 30000);
});
function renderVersion(v) {
    if (document.getElementById("version")) {
        hwapi("#version").h(v);
    } else {
        const vEl = hwapi()
            .h(v)
            .a(hwapi(".markdown-preview").get())
            .get();
        vEl.id = "version";
    }
}
