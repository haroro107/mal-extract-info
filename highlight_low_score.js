// ==UserScript==
// @name         Highlight Low Scores
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Change background and text color if score is below 7
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Function to parse and check the score
    function updateScores() {
        document.querySelectorAll('.scormem-item.score.score-label').forEach(item => {
            const scoreText = item.textContent.trim(); // Extract text content
            const scoreMatch = scoreText.match(/(\d+\.\d+|\d+)/); // Match numeric score
            if (scoreMatch) {
                const score = parseFloat(scoreMatch[0]); // Parse the score as a float
                if (score < 7) {
                    item.style.backgroundColor = 'red';  // Set background color to red
                    item.style.color = 'white';         // Set text color to white
                }
            }
        });
    }

    // Observe changes in the DOM in case scores are dynamically loaded
    const observer = new MutationObserver(updateScores);
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial execution
    updateScores();
})();
