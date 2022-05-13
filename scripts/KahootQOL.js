// ==UserScript==
// @name         Kahoot! QOL
// @namespace    https://flawcra.cc/
// @version      1.0.1-GitHub
// @description  Improves the Quality of Life on Kahoot!
// @author       FlawCra
// @license      Apache License 2.0
// @match        https://kahoot.it/*
// @icon         https://www.google.com/s2/favicons?domain=kahoot.it
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    setTimeout(function(){
        var wrppr = document.createElement("div");
        wrppr.setAttribute("id","rainbow-bg");
        var rainbow = document.createElement("style");
        rainbow.innerText = `
        .rainbow_bg {
          height: 100% !important;
          width: 100% !important;
          left:0 !important;
          right: 0 !important;
          top: 0 !important;
          bottom: 0 !important;
          position: absolute !important;
          background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3) !important;
          background-color: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3) !important;
          background-size: 1800% 1800% !important;

          -webkit-animation: rainbow 18s ease infinite !important;
          -z-animation: rainbow 18s ease infinite !important;
          -o-animation: rainbow 18s ease infinite !important;
          animation: rainbow 18s ease infinite !important;
        }

        @-webkit-keyframes rainbow {
            0%{background-position:0% 82%}
            50%{background-position:100% 19%}
            100%{background-position:0% 82%}
        }
        @-moz-keyframes rainbow {
            0%{background-position:0% 82%}
            50%{background-position:100% 19%}
            100%{background-position:0% 82%}
        }
        @-o-keyframes rainbow {
            0%{background-position:0% 82%}
            50%{background-position:100% 19%}
            100%{background-position:0% 82%}
        }
        @keyframes rainbow {
            0%{background-position:0% 82%}
            50%{background-position:100% 19%}
            100%{background-position:0% 82%}
        }
        `;
        document.body.appendChild(rainbow);
        document.querySelector(`#root > div:nth-of-type(1) > div:nth-of-type(1)`).classList.add("rainbow_bg")
        document.querySelector(`#root > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)`).classList.add("rainbow_bg");
    }, 0);
  
    setInterval(() => {
      if(document.getElementById("nickname")) document.getElementById("nickname").focus();
      if(document.querySelector(`[data-functional-selector='game-pin-input']`)) document.querySelector(`[data-functional-selector='game-pin-input']`).focus();
    }, 250);
  
    document.addEventListener("keyup", (ev) => {
      var el = document.querySelector(`[data-functional-selector='answer-${ev.keyCode-49}']`);
      if(el) el.click();
    });
})();
