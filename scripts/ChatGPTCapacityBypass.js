// ==UserScript==
// @name        ChatGPT Capacity Bypass
// @namespace   https://flawcra.cc/
// @match       https://chat.openai.com/auth/login
// @grant       none
// @version     1.0.0
// @author      FlawCra
// @description A simple script to automatically bypass the "ChatGPT is at Capacity" screen.
// ==/UserScript==

(() => {
  const content = document.body.innerHTML;
  if(!content.includes("Welcome to ChatGPT") && !content.includes("checking")) {
    location.reload();
    return;
  }
  console.log("ChatGPT Capacity bypassed!");
})();
