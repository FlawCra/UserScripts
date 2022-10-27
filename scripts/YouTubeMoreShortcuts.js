// ==UserScript==
// @name        YouTube More Shortcuts (Formerly YouTube Like/Dislike Shortcuts)
// @namespace   FlawCra.CC
// @match       https://www.youtube.com/watch
// @match       https://www.youtube.com/shorts/*
// @match       https://www.youtube.com/watch/*
// @grant       none
// @version     1.0.4-GitHub
// @author      FlawCra
// @run-at      document-end
// @license     Apache License 2.0
// @icon        https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://youtube.com&size=256
// @description Adds more shortcuts to the YouTube webapp like. For example Likes and Dislikes.
// ==/UserScript==

document.addEventListener("keydown", function(event) {
	const target = event.target;
	if(target.getAttribute("id") == "contenteditable-root") return;
  if(target.getAttribute("id") == "search") return;


  let btn_frame,
      like_btn,
      dislike_btn,
      sub_btn;

  if(location.href.includes("shorts")) {
    const vid_frame = document.querySelector(`ytd-player[style="visibility: visible;"]`).parentElement.parentElement;
    btn_frame = vid_frame.querySelector(".overlay");
    like_btn = btn_frame.querySelector("#like-button .yt-spec-button-shape-next");
    dislike_btn = btn_frame.querySelector("#dislike-button .yt-spec-button-shape-next");
    sub_btn = btn_frame.querySelector("#subscribe-button tp-yt-paper-button");
  } else if(location.href.includes("watch")) {
    btn_frame = document.querySelector("ytd-watch-metadata");
    like_btn = btn_frame.querySelectorAll("#top-level-buttons-computed yt-icon-button")[0];
    dislike_btn = btn_frame.querySelectorAll("#top-level-buttons-computed yt-icon-button")[1];
    sub_btn = btn_frame.querySelector("#subscribe-button .yt-spec-button-shape-next");
  }

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
          const confirm_unsub = document.querySelector("#confirm-button .yt-spec-button-shape-next");
          confirm_unsub.click();
        }
      }, 100);
			break;
	}
});
