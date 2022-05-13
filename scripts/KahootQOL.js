// ==UserScript==
// @name         Kahoot! QOL
// @namespace    https://flawcra.cc/
// @version      1.0.0-GitHub
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
        rainbow.innerText = `#root > div:nth-of-type(1) > div:nth-of-type(1) {
  height: 100%;
  width: 100%;
  left:0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
background-color: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
background-size: 1800% 1800%;

-webkit-animation: rainbow 18s ease infinite;
-z-animation: rainbow 18s ease infinite;
-o-animation: rainbow 18s ease infinite;
  animation: rainbow 18s ease infinite;}

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
