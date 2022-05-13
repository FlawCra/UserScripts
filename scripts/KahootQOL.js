// ==UserScript==
// @name         Kahoot! QOL
// @namespace    https://flawcra.cc/
// @version      1.0.2-GitHub
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

        @keyframes rainbow {
            0%{background-position:0% 82%}
            50%{background-position:100% 19%}
            100%{background-position:0% 82%}
        }
        
        
        
        .cube_animation {
          animation: 8s ease-in-out 0s infinite alternate none running cube_animation !important;
        }
        
        @keyframes cube_animation {
            0% {
              transform: translate3d(-5vw, 2vh, 0px) rotate(45deg);
            }
            50% {
              transform: translate3d(0px, 0px, 0px) rotate(45deg);
            }
            100% {
              transform: translate3d(-5vw, -2vh, 0px) rotate(45deg);
            }
        }
        
        
        
        .circle_animation {
          animation: 6s ease-in-out 0s infinite alternate none running circle_animation !important;
        }
        
        @keyframes circle_animation {
            0% {
              transform: translate3d(0px, 0px, 0px);
            }
            50% {
              transform: translate3d(-5vw, -2vh, 0px);
            }
            100% {
              transform: translate3d(0px, 0px, 0px);
            }
        }
        `;
        document.body.appendChild(rainbow);
        document.querySelector(`#root > div:nth-of-type(1) > div:nth-of-type(1)`).classList.add("rainbow_bg")
        document.querySelector(`#root > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)`).classList.add("rainbow_bg");
        document.querySelector(`#root > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)`).classList.add("cube_animation");
        document.querySelector(`#root > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2)`).classList.add("circle_animation");
    }, 0);
  
    setInterval(() => {
      if(document.getElementById("nickname")) document.getElementById("nickname").focus();
      if(document.querySelector(`[data-functional-selector='game-pin-input']`)) document.querySelector(`[data-functional-selector='game-pin-input']`).focus();
    }, 250);
  
    document.addEventListener("keydown", (ev) => {
      var el = document.querySelector(`[data-functional-selector='answer-${ev.keyCode-49}']`);
      if(el) el.click();
    });
})();
