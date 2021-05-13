// ==UserScript==
// @name         FlawCra Monstercat Redirect
// @namespace    https://flawcra.cc
// @version      1.0.1-GitHub
// @description  Redirects you to the FlawCra Monstercat API
// @author       FlawCra
// @match        https://monstercat.com/*
// @match        https://www.monstercat.com/*
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    var interval = setInterval(() => {
        var regex = new RegExp("(.*)monstercat\.com\/release\/(.*)");
        if(regex.test(unsafeWindow.location.href)) {
            var arr = regex.exec(unsafeWindow.location.href);
            if(arr != null) {
                var code = arr[arr.length-1];
                unsafeWindow.location.href = "https://mcat.flawcra.cc/release/"+code+"?ui";
            }
        }
    }, 1000);
})();
