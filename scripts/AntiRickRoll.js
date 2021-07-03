// ==UserScript==
// @name        AntiRickRoll
// @namespace   https://flawcra.cc/
// @match       https://*.youtube.com/*
// @match       https://antirickroll.flawcra.cc/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       unsafeWindow
// @version     1.0.1-GitHub
// @author      FlawCra
// @description Never gonna rickroll you, never gonna let you get rickrolled.
// @run-at      document-start
// ==/UserScript==

(() => {
    unsafeWindow.GM_getValue = GM_getValue;
    unsafeWindow.GM_setValue = GM_setValue;
  
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
    fetch("https://cors.flawcra.cc/"+btoa("https://antirickroll.flawcra.cc/list"), ro).then(r => r.json()).then(rickrolls => {
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
    }).catch(er => console.log('error',er));
})();
