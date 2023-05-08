// ==UserScript==
// @name        Super PiP
// @namespace   https://flawcra.cc/
// @match       *://*/*
// @grant       none
// @version     1.0.4-GitHub
// @author      FlawCra
// @license     Apache License 2.0
// @icon    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIj4KICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik00LjUgNC41bDE1IDE1bTAgMFY4LjI1bTAgMTEuMjVIOC4yNSIgLz4KPC9zdmc+
// @description A simple script to add a Picture in Picture button to multiple Sites.
// ==/UserScript==
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
</svg>`;

matchDomain(`https:\/\/(.*)\.?netflix\.com(.*)`, () => loop(() => {
  if (document.querySelector("#popout-btn")) return;
  let data = {};
  data.masterDiv = document.querySelector(`[data-uia="controls-standard"] > div > div:nth-child(3) > div > div:nth-child(3)`)
  if (!data.masterDiv) return;

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
  data.buttonDiv.innerHTML = SVG;

  data.button = document.createElement("button");
  data.button.setAttribute("class", data.buttonClass);
  data.button.setAttribute("id", "popout-btn");
  data.button.addEventListener("click", () => {
    const videoElement = document.querySelector(`[data-uia="video-canvas"]`).querySelector("video");
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      videoElement.requestPictureInPicture();
    }
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
}));

matchDomain(`https:\/\/(.*)\.?youtube\.com(.*)`, () => loop(() => {
  const elem = document.querySelector(".ytp-pip-button");
  if (elem.style.display == "") return;

  elem.style.display = "";
  elem.innerHTML = SVG;
}));

matchDomain(`https:\/\/(.*)\.?disneyplus\.com(.*)`, () => loop(() => {
  let data = {};
  data.masterDiv = document.querySelector(".controls__right");
  data.button = data.masterDiv.querySelector(`[data-tooltip="PiP"]`);
  if (data.button) return;

  data.button = document.createElement("button");
  data.button.setAttribute("type", "button");
  data.button.setAttribute("aria-label", "Picture in Picture");
  data.button.setAttribute("class", "control-icon-btn fullscreen-icon tooltip__left");
  data.button.setAttribute("role", "button");
  data.button.setAttribute("data-tooltip", "PiP");
  data.button.style.color = "#F9F9F9";
  data.button.addEventListener("click", () => {
    const videoElement = document.querySelector(`[id^="hudson-player-"]`).querySelector("video");
    if (videoElement.hasAttribute("disablepictureinpicture")) videoElement.removeAttribute("disablepictureinpicture");
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      videoElement.requestPictureInPicture();
    }
  });

  data.buttonDiv = document.createElement("div");
  data.buttonDiv.setAttribute("class", "focus-hack-div");
  data.buttonDiv.setAttribute("tabindex", "-1");

  data.buttonDiv.innerHTML = SVG;

  data.button.appendChild(data.buttonDiv);

  data.masterDiv.appendChild(data.button);
}));






function loop(func) {
  setInterval(() => {
    func();
  }, 1);
}

function matchDomain(domains, cb) {
  const url = location.href;
  if (typeof domains === 'string') { domains = [domains]; }
  if (domains.some(domain => new RegExp(domain).test(url))) {
    cb();
  }
}

function waitDOMElement(selector, tagName = '', callback, multiple = false) {
  new window.MutationObserver(function (mutations) {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!tagName || (node.tagName === tagName)) {
          if (node.matches(selector)) {
            callback(node);
            if (!multiple) { this.disconnect(); }
          }
        }
      }
    }
  }).observe(document, {
    subtree: true,
    childList: true
  });
}

function removeDOMElement(...elements) {
  for (const element of elements) {
    if (element) { element.remove(); }
  }
}

function removeClassesByPrefix(el, prefix) {
  for (const clazz of el.classList) {
    if (clazz.startsWith(prefix)) {
      el.classList.remove(clazz);
    }
  }
}

function blockElement(selector, blockAlways = false) {
  new window.MutationObserver(function (mutations) {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof window.HTMLElement) {
          if (node.matches(selector)) {
            removeDOMElement(node);
            if (!blockAlways) {
              this.disconnect(); // Stop watching for element being added after one removal
            }
          }
        }
      }
    }
  }).observe(document, { subtree: true, childList: true });
}
