// ==UserScript==
// @name        YouTube monetization eligibility percentage
// @namespace   FlawCra.CC
// @match       https://studio.youtube.com/channel/*/monetization
// @grant       none
// @version     1.0.0-GitHub
// @license      Apache License 2.0
// @author      FlawCra
// @description A simple script to calculate the percentage for YouTube monetization eligibility
// @run-at      document-idle
// ==/UserScript==

var i = setInterval(() => {
  var degRegex = new RegExp(/rotate\((.*)deg\)/)

  for(var meter of document.getElementsByTagName("ytpp-signup-eligibility-meter")) {
    var transform = meter.firstChild.style.transform;
    if(degRegex.test(transform)) {
      var percentage = ((degRegex.exec(transform)[1]/180)*100).toFixed(2);
      console.log(percentage)
      var count = meter.parentElement.parentElement.getElementsByClassName("text")[0].getElementsByClassName("count")[0];
      count.innerText += ` (${percentage}%)`;
      clearInterval(i);
    }
  }
}, 1000);
