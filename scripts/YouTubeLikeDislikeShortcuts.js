// ==UserScript==
// @name        YouTube Like/Dislike Shortcuts
// @namespace   FlawCra.CC
// @match       https://www.youtube.com/watch
// @grant       none
// @version     1.0.0-GitHub
// @author      FlawCra
// @run-at      document-end
// @license     Apache License 2.0
// @description Use your keyboard to like/dislike a video. Like=U Dislike=D
// ==/UserScript==

document.addEventListener("keydown", function(event) {
	var target = event.target;
	if(target.getAttribute("id") == "contenteditable-root") return;

	switch(event.keyCode) {
		case 68:
			document.getElementById("top-level-buttons-computed").children[1].click();
			break;
		case 85:
			document.getElementById("top-level-buttons-computed").children[0].click();
			break;
	}
});
