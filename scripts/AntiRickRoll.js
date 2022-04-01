// ==UserScript==
// @name        AntiRickRoll
// @namespace   https://flawcra.cc/
// @match       https://*.youtube.com/*
// @match       https://youtube.com/*
// @match       https://antirickroll.flawcra.cc/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       unsafeWindow
// @version     1.0.7-GitHub
// @author      FlawCra
// @license     Apache License 2.0
// @description Never gonna rickroll you, never gonna let you get rickrolled.
// @run-at      document-start
// ==/UserScript==

function blockVideo(block) {
  window["antirick_block"] = block;
  if(!block) return;
  window["antirick_loop"] = setInterval(() => {
	  var elements = document.querySelectorAll("video");
    if(elements.length > 0) {
      for(const el of elements) {
        el.style.display = window["antirick_block"] ? "none" : "";
        el.muted = window["antirick_block"];
        if(!window["antirick_block"]) {
          el.currentTime = 0;
        }
      }
    }

    if(!window["antirick_block"]) clearInterval(window["antirick_loop"]);
  }, 250);
}

(() => {
    unsafeWindow.GM_getValue = GM_getValue;
    unsafeWindow.GM_setValue = GM_setValue;
    unsafeWindow.blockVideo = blockVideo;
    //if(!GM_getValue("bypassed")) {
      blockVideo(true);
    //}
    
  
    let blocked_ids = [
        "dQw4w9WgXcQ",
        "-51AfyMqnpI",
        "oHg5SJYRHA0",
        "cvh0nX08nRw",
        "V-_O7nl0Ii0"
    ];
    var h = new Headers();
    var ro = {
        method: 'GET',
        headers: h,
        Vary: 'Origin',
    };
    fetch("https://antirickroll.flawcra.cc/list/", ro).then(r => r.json()).then(rickrolls => {
        for(var rr of rickrolls) {
          if(!blocked_ids.includes(rr))
            blocked_ids.push(rr);
        }
        if(blocked_ids.find(i => location.href.includes(i)) && !location.href.includes("https://antirickroll.flawcra.cc/?")) {
          console.log(GM_getValue("bypassed"))
          if(!GM_getValue("bypassed")) {
            location = "https://antirickroll.flawcra.cc/?"+location.href;
          }
          GM_setValue("bypassed", false)
        }
        blockVideo(false);
    }).catch(er => {
      console.log('error',er);
      blockVideo(false);
    });
})();
