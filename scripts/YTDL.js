// ==UserScript==
// @name        YouTube Downloader - Loader.to
// @namespace   https://flawcra.cc/
// @match       https://www.youtube.com/watch
// @grant       none
// @version     1.0.0-GitHub
// @author      FlawCra, Loader.to
// @description Download youtube videos in many formats.
// ==/UserScript==
(function() {
    'use strict';
var FORMAT_LABEL = {
	'17': '3GP 144p',
	'18': 'MP4 360p',
	'22': 'MP4 720p',
	'43': 'WebM 360p',
	'44': 'WebM 480p',
	'45': 'WebM 720p',
	'46': 'WebM 1080p',
	'135': 'MP4 480p - no audio',
	'136': 'MP4 720p - no audio',
	'137': 'MP4 1080p - no audio',
	'138': 'MP4 2160p - no audio',
	'140': 'M4A 128kbps - audio',
	'247': 'WebM 720p - no audio',
	'264': 'MP4 1440p - no audio',
	'266': 'MP4 2160p - no audio',
	'298': 'MP4 720p60 - no audio',
	'299': 'MP4 1080p60 - no audio'
};
var FORMAT_TYPE = {
	'17': '3gp',
	'18': 'mp4',
	'22': 'mp4',
	'43': 'webm',
	'44': 'webm',
	'45': 'webm',
	'46': 'webm',
	'135': 'mp4',
	'136': 'mp4',
	'137': 'mp4',
	'138': 'mp4',
	'140': 'm4a',
	'247': 'webm',
	'264': 'mp4',
	'266': 'mp4',
	'298': 'mp4',
	'299': 'mp4'
};
//var FORMAT_ORDER = ['17', '18', '43', '135', '44', '22', '298', '45', '137', '299', '46', '264', '138', '266', '140', '136', '247'];
var FORMAT_ORDER = ['17', '18', '44', '22'];

// all=display all versions, max=only highest quality version, none=no version
// the default settings show all MP4 videos
var SHOW_DASH_FORMATS = false;
var BUTTON_TEXT = {
	'ar': 'تنزيل',
	'cs': 'Stáhnout',
	'de': 'Herunterladen',
	'en': 'Download As',
	'es': 'Descargar',
	'fr': 'Télécharger',
	'hi': 'डाउनलोड',
	'hu': 'Letöltés',
	'id': 'Unduh',
	'it': 'Scarica',
	'ja': 'ダウンロード',
	'ko': '내려받기',
	'pl': 'Pobierz',
	'pt': 'Baixar',
	'ro': 'Descărcați',
	'ru-RU': 'Скачать',
	'tr': 'İndir',
	'zh': '下载',
	'zh-TW': '下載'
};
var BUTTON_TOOLTIP = {
	'ar': 'تنزيل هذا الفيديو',
	'cs': 'Stáhnout toto video',
	'de': 'Dieses Video herunterladen',
	'en': 'Download this video',
	'es': 'Descargar este vídeo',
	'fr': 'Télécharger cette vidéo',
	'hi': 'वीडियो डाउनलोड करें',
	'hu': 'Videó letöltése',
	'id': 'Unduh video ini',
	'it': 'Scarica questo video',
	'ja': 'このビデオをダウンロードする',
	'ko': '이 비디오를 내려받기',
	'pl': 'Pobierz plik wideo',
	'pt': 'Baixar este vídeo',
	'ro': 'Descărcați acest videoclip',
	'ru-RU': 'Скачать это видео',
	'tr': 'Bu videoyu indir',
	'zh': '下载此视频',
	'zh-TW': '下載此影片'
};

var version = 16.7;
var LISTITEM_ID = 'download-youtube-video-fmt-eytd';
var DEBUG_ID = 'download-youtube-video-debug-info';
var isMat = false;
var noLinks = false;
var dbg = false;
var STORAGE_URL = 'download-youtube-script-url';
var STORAGE_CODE = 'download-youtube-signature-code';
var STORAGE_DASH = 'download-youtube-dash-enabled';
var DECODE_RULE = [];
var downloadCodeList = [];
var isDecodeRuleUpdated = false;
var decsigfn;
var videoManifestURL;
var scriptURL;
var videoTitle;
var browser = chrome || browser;
var proKey;
var storage = window.localStorage;

function debug(str) {
	if (dbg == true) {
		console.log(str);
	};
}

window.addEventListener('spfdone', checkold, false);
window.addEventListener('DOMContentLoaded', checkold, false);
window.addEventListener('yt-page-data-updated', start, false); //yt-navigate-finish , yt-page-data-updated

function isMaterial() {
	var temp;
	temp = document.querySelector("ytd-app, [src*='polymer'],link[href*='polymer']");
	if (temp) {
		return true;
	}
}
isMat = isMaterial();

function checkold() {
	debug('DOMContentLoaded/SPFDone');
	isMat = isMaterial();
	if (/^https?:\/\/www\.youtube.com\/watch\?/.test(window.location.href) && !isMat) {
		run();
	}
}

function fixURL(url) {
	var link = document.createElement('a');
	link.href = url;
	return link.href;

}

function isString(s) {
	return (typeof s === 'string' || s instanceof String);
}

function isInteger(n) {
	return (typeof n === 'number' && n % 1 == 0);
}

function addProp(dest, src) {
	for (var k in src) {
		if (src[k] != null)
			dest[k] = src[k];
	}

	return dest;
}

function forLoop(opts, fn) {
	opts = addProp({
		start: 0,
		inc: 1
	}, opts);

	for (var idx = opts.start; idx < opts.num; idx += opts.inc) {
		if (fn.call(opts, idx, opts) === false)
			break;
	}
}

function forEach(list, fn) {
	forLoop({
		num: list.length
	}, function (idx) {
		return fn.call(list[idx], idx, list[idx]);
	});
}

function removeElement(element) {
	downloadCodeList = [];
	element && element.parentNode && element.parentNode.removeChild(element);
}

function live(event, selector, callback, context) {
	addEvent(context || document, event, function (e) {
		var found,
			el = e.target || e.srcElement;
		while (el && !(found = el.id == selector))
			el = el.parentElement;
		if (found)
			callback.call(el, e);
	});
}

function offset(el) {
	var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return {
		top: el.getBoundingClientRect().top + scrollTop,
		left: el.getBoundingClientRect().left + scrollLeft
	};
}

function isHidden(el) {
	var style = window.getComputedStyle(el);
	return (style.display === 'none');
}

function insertAfter(el, referenceNode) {
	referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

function injectScript(code) {
	var script = document.createElement('script');
	script.type = 'application/javascript';
	script.textContent = code;
	document.body.appendChild(script);
	document.body.removeChild(script);
}

function findMatch(text, regexp) {
	var matches = text.match(regexp);
	return (matches) ? matches[1] : null;
}

function addEvent(el, type, handler) {
	if (el.attachEvent)
		el.attachEvent('on' + type, handler);
	else
		el.addEventListener(type, handler);
}

function start() {
	debug('yt-updated');
	if (/^https?:\/\/www\.youtube.com\/watch\?/.test(window.location.href)) {
		run();
	}
}

function run() {

	isMat = isMaterial();
	//### Initialize things ###
	//Reset itag localstorage
	// Usage:
	var isthere = document.getElementById('eytd_btn');

	if (isthere) {

		//Remove old clickevent
		var noClickEvent = true;

		removeElement(document.getElementById('eytd_btn'));
		removeElement(document.getElementById('eytd_list'));

		//Remove iFrame DIV


		var frm_div = document.getElementById('EXT_DIV');
		if (frm_div) {
			frm_div.parentElement.removeChild(frm_div);
		}
	}

	// get button labels
	var language = document.documentElement.getAttribute('lang');
	var buttonText = (BUTTON_TEXT[language]) ? BUTTON_TEXT[language] : BUTTON_TEXT['en'];
	var buttonLabel = (BUTTON_TOOLTIP[language]) ? BUTTON_TOOLTIP[language] : BUTTON_TOOLTIP['en'];

	//Populate link items
	let listItems = [];

	let style = `#eytd_list {
		background-color: white;
		position: absolute;
		width: 250px;
		box-shadow: 1px 5px 25px 1px gray;
		padding: 5px 0;
		display: none;
		z-index: 55555;
		
	}
	
	.eytd_list_item {
		height: 40px;
		cursor: pointer;
		display: flex;
		-ms-flex-direction: row;
		-webkit-flex-direction: row;
		flex-direction: row;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-family: 'Roboto', 'Noto', sans-serif;
		-webkit-font-smoothing: antialiased;
		font-size: 16px;
		font-weight: 400;
		line-height: 24px;
		white-space: nowrap;
		padding: 0 16px;
		color: black;
	}
	
	
	.eytd_icon{
		width: 25px;
		height: 25px;
		margin-right: 31px;
		vertical-align: middle;
	}
	.eytd_list_item a{
		width: 100%;
		display: block;
		text-decoration: none;
	}
	.eytd_list_item a:visited{
		color: hsl(0, 0%, 6.7%);
		text-decoration: none;
		
	}
	
	.eytd_list_item:hover {
		background-color: #f5f5f5;
	}
	
	#eytd_btn {
	background-color: green;
	border-radius: 2px;
	padding: 10px 16px;
	margin: auto 4px;
	white-space: nowrap;
	font-size: 1.4rem;
	font-weight: 500;
	letter-spacing: .007px;
	text-transform: uppercase;
	-ms-flex-direction: row;
	-webkit-flex-direction: row;
	flex-direction: row;
	display: inline-block;
	position: relative;
	box-sizing: border-box;
	min-width: 5.14em;
	border: none;
	color: white;
	cursor: pointer;
}`;

	let styleDom = document.createElement("style");
	styleDom.setAttribute("type", "text/css");
	document.head.appendChild(styleDom);
	styleDom.innerHTML = style;

	function createList(list) {
		var url = encodeURIComponent(window.location.href);

		let listDom = document.createElement("div");
		listDom.setAttribute("id", "eytd_list");
		listDom.setAttribute("style", "display: none;");

		let div = document.createElement("div");
		div.className = "eytd_list_item";
		let a = document.createElement("a");
		a.href = "https://loader.to/?link=" + url + "&f=1&s=1&e=20&r=loader";
		a.text = "Download MP3";
		a.target = "_blank";
		div.appendChild(a);
		listDom.appendChild(div);

		div = document.createElement("div");
		div.className = "eytd_list_item";
		a = document.createElement("a");
		a.href = "https://loader.to/?link=" + url + "&f=2&s=1&e=20&r=loader";
		a.text = "Download M4A";
		a.target = "_blank";
		div.appendChild(a);
		listDom.appendChild(div);

		div = document.createElement("div");
		div.className = "eytd_list_item";
		a = document.createElement("a");
		a.href = "https://loader.to/?link=" + url + "&f=3&s=1&e=20&r=loader";
		a.text = "Download WEBM (Audio)";
		a.target = "_blank";
		div.appendChild(a);
		listDom.appendChild(div);

		div = document.createElement("div");
		div.className = "eytd_list_item";
		a = document.createElement("a");
		a.href = "https://loader.to/?link=" + url + "&f=11&s=1&e=20&r=loader";
		a.text = "Download AAC";
		a.target = "_blank";
		div.appendChild(a);
		listDom.appendChild(div);

		div = document.createElement("div");
		div.className = "eytd_list_item";
		a = document.createElement("a");
		a.href = "https://loader.to/?link=" + url + "&f=12&s=1&e=20&r=loader";
		a.text = "Download FLAC";
		a.target = "_blank";
		div.appendChild(a);
		listDom.appendChild(div);

		div = document.createElement("div");
		div.className = "eytd_list_item";
		a = document.createElement("a");
		a.href = "https://loader.to/?link=" + url + "&f=13&s=1&e=20&r=loader";
		a.text = "Download OPUS";
		a.target = "_blank";
		div.appendChild(a);
		listDom.appendChild(div);

		div = document.createElement("div");
		div.className = "eytd_list_item";
		a = document.createElement("a");
		a.href = "https://loader.to/?link=" + url + "&f=14&s=1&e=20&r=loader";
		a.text = "Download OGG";
		a.target = "_blank";
		div.appendChild(a);
		listDom.appendChild(div);

		div = document.createElement("div");
		div.className = "eytd_list_item";
		a = document.createElement("a");
		a.href = "https://loader.to/?link=" + url + "&f=15&s=1&e=20&r=loader";
		a.text = "Download WAV";
		a.target = "_blank";
		div.appendChild(a);
		listDom.appendChild(div);

		div = document.createElement("div");
		div.className = "eytd_list_item";
		a = document.createElement("a");
		a.href = "https://loader.to/?link=" + url + "&f=4&s=1&e=20&r=loader";
		a.text = "Download MP4 (360p)";
		a.target = "_blank";
		div.appendChild(a);
		listDom.appendChild(div);

		div = document.createElement("div");
		div.className = "eytd_list_item";
		a = document.createElement("a");
		a.href = "https://loader.to/?link=" + url + "&f=5&s=1&e=20&r=loader";
		a.text = "Download MP4 (480p)";
		a.target = "_blank";
		div.appendChild(a);
		listDom.appendChild(div);

		div = document.createElement("div");
		div.className = "eytd_list_item";
		a = document.createElement("a");
		a.href = "https://loader.to/?link=" + url + "&f=6&s=1&e=20&r=loader";
		a.text = "Download MP4 (720p)";
		a.target = "_blank";
		div.appendChild(a);
		listDom.appendChild(div);

		div = document.createElement("div");
		div.className = "eytd_list_item";
		a = document.createElement("a");
		a.href = "https://loader.to/?link=" + url + "&f=7&s=1&e=20&r=loader";
		a.text = "Download MP4 (1080p)";
		a.target = "_blank";
		div.appendChild(a);
		listDom.appendChild(div);

		div = document.createElement("div");
		div.className = "eytd_list_item";
		a = document.createElement("a");
		a.href = "https://loader.to/?link=" + url + "&f=9&s=1&e=20&r=loader";
		a.text = "Download WEBM (4K)";
		a.target = "_blank";
		div.appendChild(a);
		listDom.appendChild(div);

		div = document.createElement("div");
		div.className = "eytd_list_item";
		a = document.createElement("a");
		a.href = "https://loader.to/?link=" + url + "&f=10&s=1&e=20&r=loader";
		a.text = "Download WEBM (8K)";
		a.target = "_blank";
		div.appendChild(a);
		listDom.appendChild(div);

		return listDom;
	}

	let c = setInterval(function () {
		if (
			document.querySelector("ytd-video-owner-renderer") ||
			document.getElementById("watch7-action-buttons") ||
			document.getElementById("watch8-secondary-actions") ||
			document.getElementById("ytm-item-section-renderer>lazy-list") ||
			document.querySelector("ytm-slim-owner-renderer")
		) {
			clearInterval(c);
			let button = document.createElement("button");
			button.setAttribute("id", "eytd_btn");
			button.textContent = " " + buttonText + ": ▼" + " ";
			button.setAttribute("data-tooltip-text", buttonLabel);
			if (isMat) {
				//insertAfter(button, document.querySelector("ytd-video-owner-renderer"));
				//insertAfter(button, document.querySelector("subscribe-button"));
				var firstTopRow = document.getElementById("secondary-info");
				if (firstTopRow) {
					firstTopRow.remove();
				}
				var parentElement = document.getElementById("top-row");
				// parentElement.appendChild(button);
				parentElement.insertBefore(button, parentElement.childNodes[1]);
				debug("isMat True Add Button");
			} else {
				var parentElement = document.getElementById("watch7-action-buttons");
				if (parentElement == null) {
					parentElement = document.getElementById("watch8-secondary-actions");
					if (parentElement == null) {
						console.log(
							"Error - Old Youtube Code No container for adding the download button. YouTube must have changed the code."
						);
						return;
					} else {
						newWatchPage = true;
					}
				}
				// add the button
				if (!newWatchPage) {
					// watch7
					parentElement.appendChild(button);
				} else {
					// watch8
					parentElement.insertBefore(button, parentElement.firstChild);
				}
				//insertAfter(button, document.querySelector("watch8-action-buttons"));
			}
			if (document.querySelector("ytm-slim-owner-renderer")) {
				insertAfter(button, document.querySelector("ytm-slim-owner-renderer"));
			}
		}
	}, 10);

	if (!noClickEvent) {
		//Only if not a reload
		live("click", "eytd_btn", function () {
			let button = document.querySelector("#eytd_btn");
			let list = document.querySelector("#eytd_list");
			let position = offset(button);
			list.style.display = isHidden(list) ? "block" : "none";
			list.style.top = position.top + button.offsetHeight + 5 + "px";
			list.style.left =
				position.left - (list.offsetWidth - button.offsetWidth) / 2 + "px";
		});
	}

	document.addEventListener("click", function (e) {
		let t = e.target,
			id = t.getAttribute("id"),
			css = t.getAttribute("class");
		//if ((css && css.includes("eytd_list_item"))) { //button was clicked
		//	console.log('wait');
		//}

		if (!(id === "eytd_btn" || id === "eytd_list" || (css && css.includes("eytd_list_item")))) {
			document.querySelector("#eytd_list").style.display = "none";
		}
	});

	//Attach list
	document.body.appendChild(createList(listItems));
}
})();
