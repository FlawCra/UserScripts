// ==UserScript==
// @name         FlawCra Monstercat Redirect
// @namespace    https://flawcra.cc
// @version      1.0.4-GitHub
// @description  Redirects you to the FlawCra Monstercat API
// @author       FlawCra
// @license      Apache License 2.0
// @match        https://monstercat.com/*
// @match        https://www.monstercat.com/*
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    var interval = setInterval(() => {
        var regex = new RegExp("(.*)monstercat\.com\/release\/(.*)");
        var playerRegex = new RegExp("(.*)monstercat\.com\/player\/release\/(.*)\?");
        var altPlayerRegex = new RegExp("(.*)monstercat\.com\/player\/release\/(.*)");
        if(regex.test(unsafeWindow.location.href)) {
            redirToMcatAPI(regex.exec(unsafeWindow.location.href));
        } else if(playerRegex.test(unsafeWindow.location.href)) {
            redirToMcatAPI(playerRegex.exec(unsafeWindow.location.href));
        } else if(altPlayerRegex.test(unsafeWindow.location.href)) {
            redirToMcatAPI(altPlayerRegex.exec(unsafeWindow.location.href));
        }
    }, 1000);
})();

function redirToMcatAPI(arr) {
  if(arr != null) {
    var code = arr[arr.length-1];
    unsafeWindow.location.href = "https://mcat.flawcra.cc/release/"+code+"?ui";
  }
}
