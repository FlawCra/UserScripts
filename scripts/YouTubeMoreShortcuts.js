// ==UserScript==
// @name        YouTube More Shortcuts (Formerly YouTube Like/Dislike Shortcuts)
// @namespace   FlawCra.CC
// @match       https://www.youtube.com/watch
// @match       https://www.youtube.com/shorts/*
// @match       https://www.youtube.com/watch/*
// @grant       none
// @version     1.0.3-GitHub
// @author      FlawCra
// @run-at      document-end
// @license     Apache License 2.0
// @icon        https://www.google.com/s2/favicons?domain=youtube.com
// @description Adds more shortcuts to the YouTube webapp like. For example Likes and Dislikes.
// ==/UserScript==

console.debug(1);

document.addEventListener("keydown", function(event) {
	const target = event.target;
	if(target.getAttribute("id") == "contenteditable-root") return;
  if(target.getAttribute("id") == "search") return;
  
  
  let btn_frame,
      like_btn,
      dislike_btn;

  if(location.href.includes("shorts")) {
    const vid_frame = document.querySelector(`ytd-player[style="visibility: visible;"]`).parentElement.parentElement;
    btn_frame = vid_frame.querySelector(".overlay");
    like_btn = btn_frame.querySelector("#like-button tp-yt-paper-button");
    dislike_btn = btn_frame.querySelector("#dislike-button tp-yt-paper-button");
  } else if(location.href.includes("watch")) {
    btn_frame = document.querySelector("ytd-watch-metadata");
    like_btn = btn_frame.querySelectorAll("#top-level-buttons-computed yt-icon-button")[0];
    dislike_btn = btn_frame.querySelectorAll("#top-level-buttons-computed yt-icon-button")[1];
  }
  
  const sub_btn = btn_frame.querySelector("#subscribe-button tp-yt-paper-button");
  let should_unsub = false;

	switch(event.keyCode) {
		case 68:
			dislike_btn.click();
			break;
		case 85:
			like_btn.click();
			break;
    case 83:
      if(sub_btn.hasAttribute("subscribed")) should_unsub = true;
      sub_btn.click();
			setTimeout(() => {
        if(should_unsub) {
          const confirm_unsub = document.getElementById("confirm-button");
          confirm_unsub.click();
        }
      }, 100);
			break;
	}
});
