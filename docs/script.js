window.addEventListener('DOMContentLoaded', function () {

    fetch('../.version')
        .then(r => r.text())
        .then(v => {
            v = hwapi().h(v.trim()).a(hwapi('.markdown-preview').get()).get();
            v.id = "version";
        });

});

