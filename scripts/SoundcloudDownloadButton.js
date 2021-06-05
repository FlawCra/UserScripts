// ==UserScript==
// @name         Soundcloud Download Button
// @namespace    https://flawcra.cc/
// @version      1.0.4-GitHub
// @description  A Script that adds a Download button to SoundCloud
// @author       FlawCra
// @match        https://soundcloud.com/*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
setTimeout(() => {

    let re1 = new RegExp('(.*)soundcloud.com/(.*)/(.*)');
let re2 = new RegExp('(.*)soundcloud.com/(.*)/sets/(.*)');
var btnElem = document.createElement("button");
    btnElem.setAttribute("type","button");
    btnElem.setAttribute("class","sc-button-download sc-button sc-button-medium sc-button-responsive");
    btnElem.setAttribute("aria-describedby","tooltip-122");
    btnElem.setAttribute("tabindex","0");
	if(re2.test(location.href)) {
	    btnElem.setAttribute("title","Download Playlist");
        btnElem.setAttribute("aria-label","Download Playlist");
        btnElem.innerText = "Download Playlist";
	} else {
        btnElem.setAttribute("title","Download");
        btnElem.setAttribute("aria-label","Download");
        btnElem.innerText = "Download";
    }
    btnElem.onclick = (data) => {
        if(re2.test(location.href)) {
			var tmp = re2.exec(location.href);
            var url = "https://scr.flawcra.cc/"+tmp[2]+"/sets/"+tmp[3];
			fetch(url).then(function(t) {
                return t.blob().then((b)=>{
                    var a = document.createElement("a");
                    a.href = URL.createObjectURL(b);
                    a.setAttribute("download", tmp[2] + " - " + tmp[3] + ".m3u8");
                    a.click();
                });
            	});
		} else if(re1.test(location.href)) {
            var tmp = re1.exec(location.href);
            var url = "https://scr.flawcra.cc/"+tmp[2]+"/"+tmp[3];
			fetch(url).then(function(t) {
                return t.blob().then((b)=>{
                    var a = document.createElement("a");
                    a.href = URL.createObjectURL(b);
                    a.setAttribute("download", tmp[2] + " - " + tmp[3] + ".mp3");
                    a.click();
                });
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
