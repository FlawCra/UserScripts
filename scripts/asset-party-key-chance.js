// ==UserScript==
// @name        asset.party key chance
// @namespace   https://flawcra.cc/
// @match       https://asset.party/get/developer/preview
// @grant       none
// @version     1.0.0-GitHub
// @author      FlawCra
// @icon        https://www.google.com/s2/favicons?domain=asset.party
// @license     Apache License 2.0
// @description A simple script to view how unlikely you are to get an s&box key.
// ==/UserScript==
setInterval(() => {
    const tags = document.getElementsByClassName("tag");
    let parent = tags[tags.length-1].parentElement;
    test = tags[tags.length-3].innerText;
    test = test.replace("people\n","");
    test2 = "";
    if(tags.length > 4) {
      test2 = tags[tags.length-5].innerText;
    }

    test2 = test2.replace("key\n","");
    chance = (parseInt(test2)/parseInt(test))*100;
    if(Number.isNaN(chance)) {
        let span = document.createElement("span");
        span.classList.add("tag");
        span.setAttribute("title", "Chance in Percent");
        span.innerHTML = `<i>key</i>0 %`;
        parent.appendChild(span);

    }
    chance = Math.round((chance + Number.EPSILON) * 100) / 100
    tags[tags.length-1].innerHTML = `<i>key</i>${chance} %`;
}, 150);
