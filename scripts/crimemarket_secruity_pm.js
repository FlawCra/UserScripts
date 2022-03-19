// ==UserScript==
// @name        crimemarket.to - Private Message Security
// @namespace   https://flawcra.cc/
// @match       https://crimemarket.to/*
// @grant       none
// @version     1.0.2-GitHub
// @author      FlawCra
// @license     Apache License 2.0
// @description A simple script to secure your messages.
// ==/UserScript==


    (function(xhr) {
        var
          proto = xhr.prototype,
          _send = proto.send,
          _open = proto.open;
      
        proto.open = function() {
          this._method = arguments[0];
          this._url = arguments[1];
          this._args = arguments;
          _open.apply(this, arguments);
        }
      
        proto.send = async function() {
            var req = this;
            if (this._method.toLowerCase() === 'post' && window["location"]["hostname"] === 'crimemarket.to') {
                if(!document.getElementsByClassName("cke_wysiwyg_div")[0].innerHTML.includes("https://revealit.me/")) {
                    var htmlMessage = fc_getParameterByName("messenger_comment_271114", "http://example.com/?"+arguments[0]);
                    if(htmlMessage) {
                        if(!checkIfStringIsWhitespace(htmlMessage.replace("<p>","").replace("</p>","").trim())) {
                            var req = await fetch("https://cors.flawcra.cc/?"+"https://revealit.me/register", {
                              "headers": {
                                "accept": "*/*",
                                "accept-language": "en-US,en;q=0.9",
                                "content-type": "application/x-www-form-urlencoded",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                                "sec-gpc": "1"
                              },
                              "referrer": "https://revealit.me/",
                              "referrerPolicy": "strict-origin-when-cross-origin",
                              "body": "data="+encodeURIComponent(htmlMessage.replace("<p>","").replace("</p>","").trim()),
                              "method": "POST",
                              "mode": "cors",
                              "credentials": "omit"
                            });
                            var data = await req.text();
                            if(data) {
                                document.getElementsByClassName("cke_wysiwyg_div")[0].innerHTML = data;
                                for(var btn of document.getElementsByClassName("ipsButton_primary")) {
                                    if(btn.disabled) {
                                        btn.disabled = false;
                                        btn.click();
                                    }
                                }
                                return;
                            }

                        }
                    }
                }
            }
            _send.apply(this, arguments);
        }
      
      })(XMLHttpRequest);

function fc_getParameterByName(name, url) {
	name = name.replace(/[\[\]]/g, '\\$&')
	name = name.replace(/\//g, '')
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url)
 
	if (!results) return null
	else if (!results[2]) return ''
	else if (results[2]) {
		results[2] = results[2].replace(/\//g, '')
	}
 
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/* Copilot Generated :) */
function checkIfStringIsWhitespace(str) {
    return /^\s*$/.test(str);
}
function setHtmlParamter(url, param, value) {
    const re = new RegExp(`[?&]${param}=([^&]*)`, 'i');
    const res = url.replace(re, `$1${value}`);
    return res.replace(/^([^?&]*)([?&])/, `$1$2`);
}
