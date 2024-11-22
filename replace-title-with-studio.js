// ==UserScript==
// @name         Replace Title with Anime Info
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Replace title with formatted anime information on MyAnimeList
// @author       Haroro
// @match        https://myanimelist.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Find the title name
    const titleElement = document.querySelector("h1.title-name strong");
    const title = titleElement ? titleElement.textContent.trim() : "Unknown";

    // Find the aired date
    const airedElement = Array.from(document.querySelectorAll("div.spaceit_pad"))
        .find(el => el.textContent.includes("Aired:"));
    const airedText = airedElement ? airedElement.textContent.split("Aired:")[1].trim() : "Unknown";
    const firstAiredDate = airedText.split(" to ")[0]; // Extract the starting date

    // Find the type
    const typeElement = Array.from(document.querySelectorAll("div.spaceit_pad"))
        .find(el => el.textContent.includes("Type:"));
    const type = typeElement ? typeElement.querySelector("a").textContent.trim() : "Unknown";

    // Find the studio
    const studioElement = Array.from(document.querySelectorAll("div.spaceit_pad"))
        .find(el => el.textContent.includes("Studios:"));
    const studio = studioElement ? studioElement.querySelector("a").textContent.trim() : "Unknown";

    // Format the date
    const dateParts = firstAiredDate.match(/\b(\w{3}) (\d{1,2}), (\d{4})\b/);
    const monthMap = {
        Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
        Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    };
    const formattedDate = dateParts ? `${dateParts[3].slice(-2)}${monthMap[dateParts[1]]}${dateParts[2].padStart(2, '0')}` : "000000";

    // Create the new content
    const message = `[${formattedDate}] [${studio}] ${title} 【${type}】`;

    // Replace the title with the formatted message
    if (titleElement) {
        titleElement.textContent = message;
    }
})();
