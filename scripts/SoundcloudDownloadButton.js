// ==UserScript==
// @name         Soundcloud Download Button
// @namespace    https://flawcra.cc/
// @version      1.0.3-GitHub
// @description  A Script that adds a Download button to SoundCloud
// @author       FlawCra
// @match        https://soundcloud.com/*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
setTimeout(() => {

    var btnElem = document.createElement("button");
    btnElem.setAttribute("type","button");
    btnElem.setAttribute("class","sc-button-download sc-button sc-button-medium sc-button-responsive");
    btnElem.setAttribute("aria-describedby","tooltip-122");
    btnElem.setAttribute("tabindex","0");
    btnElem.setAttribute("title","Download");
    btnElem.setAttribute("aria-label","Download");
    btnElem.innerText = "Download";
    btnElem.onclick = (data) => {
        let re = new RegExp('(.*)soundcloud.com/(.*)/(.*)');
        if(re.test(location.href)) {
            var tmp = re.exec(location.href);
            var url = "https://scr.flawcra.cc/"+tmp[2]+"/"+tmp[3];
            fetch(url).then(function(t) {
                return t.blob().then((b)=>{
                    var a = document.createElement("a");
                    a.href = URL.createObjectURL(b);
                    a.setAttribute("download", tmp[2] + " - " + tmp[3] + ".mp3");
                    a.click();
                }
                                    );
            });
        }
    };
    for(var i of document.getElementsByClassName("sc-button-group")) {
        if(i.classList.contains("sc-button-group-medium")) {
            i.insertAdjacentElement("afterBegin",btnElem);
        }
    }

}, 5000);
    
})();
