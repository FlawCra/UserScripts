// ==UserScript==
// @name         Soundcloud Download Button
// @namespace    https://flawcra.cc/
// @version      1.0.7-GitHub
// @description  A Script that adds a Download button to SoundCloud
// @author       FlawCra
// @license      Apache License 2.0
// @match        https://soundcloud.com/*/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  function downdone() {
    clearInterval(window["downloop"]);
    window["loopbtn"].innerText = "Download complete!";
    setTimeout(() => {
      window["loopbtn"].innerText = "Download";
    }, 5000);
  }

  setInterval(() => {
    const re1 = new RegExp('(.*)soundcloud.com/(.*)/(.*)');
    const re2 = new RegExp('(.*)soundcloud.com/(.*)/sets/(.*)');
    if(document.querySelector("#scr-download-button") != null) return;
    const btnElem = document.createElement("button");
    btnElem.setAttribute("type", "button");
    btnElem.setAttribute("id", "scr-download-button");
    btnElem.setAttribute("class", "sc-button-download sc-button sc-button-medium sc-button-responsive");
    btnElem.setAttribute("aria-describedby", "tooltip-122");
    btnElem.setAttribute("tabindex", "0");
    if (re2.test(location.href)) {
      btnElem.setAttribute("title", "Download Playlist");
      btnElem.setAttribute("aria-label", "Download Playlist");
      btnElem.innerText = "Download Playlist";
    } else {
      btnElem.setAttribute("title", "Download");
      btnElem.setAttribute("aria-label", "Download");
      btnElem.innerText = "Download";
    }
    btnElem.onclick = (event) => {
      window["loopcount"] = 1
      const path = event.path || (event.composedPath && event.composedPath());
      window["loopbtn"] = path[0];
      window["downloop"] = setInterval(() => {
        switch (window["loopcount"]) {
          case 1:
            window["loopbtn"].innerText = "Downloading .";
            window["loopcount"] = 2;
            break;

          case 2:
            window["loopbtn"].innerText = "Downloading ..";
            window["loopcount"] = 3;
            break;

          case 3:
            window["loopbtn"].innerText = "Downloading ...";
            window["loopcount"] = 4;
            break;

          case 4:
            window["loopcount"] = 1;
            break;
        }
      }, 333);
      if (re2.test(location.href)) {
        const tmp = re2.exec(location.href);
        const url = "https://scr.flawcra.cc/" + tmp[2] + "/sets/" + tmp[3];
        fetch(url).then(function (t) {
          downdone();
          return t.blob().then((b) => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.setAttribute("download", tmp[2] + " - " + tmp[3] + ".m3u8");
            a.click();
          });
        });
      } else if (re1.test(location.href)) {
        const tmp = re1.exec(location.href);
        const url = "https://scr.flawcra.cc/" + tmp[2] + "/" + tmp[3];
        fetch(url).then(function (t) {
          downdone();
          return t.blob().then((b) => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.setAttribute("download", tmp[2] + " - " + tmp[3] + ".mp3");
            a.click();
          });
        });
      }
    };
    for (const i of document.getElementsByClassName("sc-button-group")) {
      if (i.classList.contains("sc-button-group-medium")) {
        i.insertAdjacentElement("afterBegin", btnElem);
      }
    }
  }, 100);
})();
