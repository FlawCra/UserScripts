// ==UserScript==
// @name        Netflix PiP
// @namespace   https://flawcra.cc/
// @match       https://*netflix.com/*
// @grant       none
// @version     1.0.0-GitHub
// @author      FlawCra
// @license     Apache License 2.0
// @description A simple script to add a Picture in Picture button to Netflix.
// ==/UserScript==

setInterval(() => {
    if(document.querySelector("#popout-btn")) return;
    let data = {};
    data.masterDiv = document.querySelector(`[data-uia="controls-standard"] > div > div:nth-child(3) > div > div:nth-child(3)`)
    if(!data.masterDiv) return;

    data.exampleSpacer = data.masterDiv.querySelector(`[class^="ltr-"]`);
    data.spacerClass = data.exampleSpacer.getAttribute("class");
    data.spacerStyle = data.exampleSpacer.getAttribute("style");

    data.exampleIcon = data.masterDiv.querySelector(`.medium`);
    data.iconClass = data.exampleIcon.getAttribute("class");

    data.exampleButton = data.exampleIcon.querySelector("button");
    data.buttonClass = data.exampleButton.getAttribute("class");

    data.exampleButtonDiv = data.exampleButton.querySelector("div");
    data.buttonDivClass = data.exampleButtonDiv.getAttribute("class");
    data.buttonDivRole = data.exampleButtonDiv.getAttribute("role");

    data.buttonDiv = document.createElement("div");
    data.buttonDiv.setAttribute("class", data.buttonDivClass);
    data.buttonDiv.setAttribute("role", data.buttonDivRole);
    data.buttonDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
</svg>
`;

    data.button = document.createElement("button");
    data.button.setAttribute("class", data.buttonClass);
    data.button.setAttribute("id", "popout-btn");
    data.button.addEventListener("click", () => {
        document.querySelector(`[data-uia="video-canvas"]`).querySelector("video").requestPictureInPicture();
    });

    data.button.addEventListener("mouseenter", () => {
        data.button.classList.add("active");
    });

    data.button.addEventListener("mouseleave", () => {
        data.button.classList.remove("active");
    });

    data.button.appendChild(data.buttonDiv);

    data.icon = document.createElement("div");
    data.icon.setAttribute("class", data.iconClass);
    data.icon.appendChild(data.button);

    data.spacer = document.createElement("div");
    data.spacer.setAttribute("class", data.spacerClass);
    data.spacer.setAttribute("style", data.spacerStyle);

    data.masterDiv.appendChild(data.spacer);
    data.masterDiv.appendChild(data.icon);
}, 1);
