// ==UserScript==
// @name         Bandcamp Download Button
// @namespace    https://flawcra.cc
// @version      1.0.5-GitHub
// @description  A simple download button for Bandcamp and Bandcamp based sites
// @author       FlawCra
// @match        *://*/*
// @grant        all
// ==/UserScript==

(function() {
    'use strict';
    var tryLoop = setInterval(() => {
      if(document.getElementById("footer-logo")) {
            if(document.getElementById("footer-logo").firstChild.innerText == "Bandcamp") {
                var bar = document.getElementsByClassName("share-collect-controls")[0]
                var spacer = document.createElement("a");
                spacer.setAttribute("id", "collect-anchor");
                bar.appendChild(spacer);
                var elem = document.createElement("li");
                elem.setAttribute("id", "download-item");
                elem.setAttribute("class", "download");

                var action = document.createElement("span");
                action.setAttribute("id", "download-msg");
                action.setAttribute("class", "action compound-button");
                action.setAttribute("title", "Download this track");
                action.addEventListener("click", () => {
                    if(document.getElementsByTagName("audio")[0].src) {
                        fetch("https://cors.flawcra.cc/"+btoa(document.getElementsByTagName("audio")[0].src)).then(function(t) {
                            return t.blob().then((b)=>{
                                var a = document.createElement("a");
                                a.href = URL.createObjectURL(b);
                                if(document.getElementsByClassName("title")[0].innerText) {
                                    a.setAttribute("download", document.getElementById("name-section").children[1].firstElementChild.innerText + " - " +document.getElementsByClassName("trackTitle")[0].innerText + " - " + document.getElementsByClassName("title")[0].innerText + ".mp3");
                                } else {
                                    a.setAttribute("download", document.getElementById("name-section").children[1].firstElementChild.innerText + " - " +document.getElementsByClassName("trackTitle")[0].innerText + ".mp3");
                                }
                                a.click();
                            });
                        });
                    } else {
                        alert("Please play a song first!")
                    }
                });

                var msg = document.createElement("span");
                action.setAttribute("class", "download-msg");

                var textwrapper = document.createElement("span");
                var btntext = document.createElement("a");
                btntext.innerText = "Download";

                textwrapper.appendChild(btntext);
                msg.appendChild(textwrapper);
                action.appendChild(msg);
                elem.appendChild(action);
                bar.appendChild(elem);
          clearInterval(tryLoop);
            }
        }
    }, 1000);
})();
