// ==UserScript==
// @name         Discord Verify Exploit
// @namespace    http://flawcra.cc/
// @version      2.0.1-GitHub
// @description  Workaround for the Discord Verification
// @author       FlawCra
// @match        https://discordapp.com/library/*
// @match        https://discordapp.com/store/*
// @match        https://discordapp.com/channels/*
// @match        https://discord.com/library/*
// @match        https://discord.com/store/*
// @match        https://discord.com/channels/*
// @run-at document-end
// ==/UserScript==
 
(function() {
    'use strict';
    setTimeout(function(){
        document.querySelector('[aria-label="VERIFICATION"]').remove();
        document.querySelector("#app-mount > div:nth-of-type(2)").children[0].children[1].children[0].style = ""
    }, 15000);
})();
