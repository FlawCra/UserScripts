// ==UserScript==
// @name        Codenames AI Guesser
// @namespace   https://flawcra.cc/
// @match       https://codenames.game/*
// @grant       none
// @version     1.0.0-GitHub
// @author      FlawCra
// @license     Apache License 2.0
// @description A simple script that sends all possible words with the hint to an AI server to guess the correct word(s)
// ==/UserScript==

guess_answer = (() => {
    let list = [];
    // Query all elements with the class 'cardImage'
    document.querySelectorAll(".cardImage").forEach((it) => {
        // Check if the element contains the class 'gray'
        if (!it.classList.contains("gray")) return;
        // Push the parent element's innerText to the list
        list.push(it.parentElement.innerText.trim());
    });

    // Access elements for hint and targets
    const btnList = document.querySelector("#layoutRoot > .bottom .button")?.parentElement?.parentElement;
    if(!btnList) return;
    let hintguess = btnList.querySelector("article")?.children;
    if(!hintguess) return;
    let hint = hintguess[0].innerText.trim();
    let targets = parseInt(hintguess[1].innerText.trim());

    // Create the JSON object
    let jObj = { words: list, hint, targets };

    // Perform the fetch request
    (async () => {
        try {
            let response = await fetch("https://cng.flawcra.cc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jObj)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                let result = await response.json();
                if(result.hasOwnProperty("error")) {
                    console.log(result.error);
                    return;
                }
                let ai_results = btnList.querySelector(".ai-results");
                if(ai_results) ai_results.remove();

                const answers_text = result.answers.join(", ");

                ai_results = document.createElement("span");
                ai_results.innerText = `AI GUESS RESULT: ${answers_text}`;
                ai_results.setAttribute("class", "text-center text-white");
                btnList.appendChild(ai_results);
            }
        } catch (error) {
            console.error('Error during fetch operation:', error);
        }
    })();

});
setInterval(() => {
    if(document.getElementById("ai-guess-btn")) return;
    const btnList = document.querySelector("#layoutRoot > .bottom .button")?.parentElement?.parentElement;
    if(!btnList) return;
    const btn = document.querySelector("#layoutRoot > .bottom .button").cloneNode(true);
    btn.innerText = "AI GUESS";
    btn.id = "ai-guess-btn";
    btn.onclick = guess_answer;
    btnList.appendChild(btn);
}, 50);
