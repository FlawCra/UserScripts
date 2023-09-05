// ==UserScript==
// @name        YouTube QOL
// @namespace   FlawCra.CC
// @match       https://*.youtube.com/*
// @match       https://youtube.com/*
// @grant       none
// @version     1.0.0-GitHub
// @author      FlawCra
// @run-at      document-end
// @license     Apache License 2.0
// @description Some Quality of Life improvements for YouTube
// @icon        https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://youtube.com&size=256
// ==/UserScript==
setInterval(() => {
  document.getElementById("clarify-box")?.remove()
  document.getElementById("comment-teaser")?.remove()
}, 250);


var h = new Headers();
var ro = {
    method: 'GET',
    headers: h,
    Vary: 'Origin',
};
fetch("https://youtubeqol.flawcra.cc/channelfilter", ro).then(r => r.json()).then(blacklist => {
    setInterval(() => {
        document.querySelectorAll("yt-formatted-string.ytd-channel-name").forEach((e) => {
            if (e.classList.contains("complex-string")) return;
            if (!e.querySelector("a")) return;
            const handle = e.querySelector("a").href.split("/")[3];
            if (Object.keys(blacklist).includes(handle)) {
                const entry = blacklist[handle];
                if (entry.requireVerify) {
                    const badge = e.parentElement.parentElement.parentElement.querySelector("ytd-badge-supported-renderer");
                    if (!badge) return;
                }

                const elem = e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                console.log(elem.remove())
            }
        });
    }, 15);
}).catch(er => {
    console.log('error', er);
});
