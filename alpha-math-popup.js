const LATIN_ALPHABET = ["a", "b", "c", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function debug(text) {
    chrome.runtime.sendMessage({
        text,
        type: "debugPopup"
    });
}

function populateTable() {
    table = document.getElementById("symbol-table");
    LATIN_ALPHABET.forEach(letter => {
        const row = table.insertRow();
        insertCellWithContent(row, getDoubleStruckSymbol(letter));
        insertCellWithContent(row, getDoubleStruckSymbol(letter.toUpperCase()));
        insertCellWithContent(row, getScriptSymbol(letter));
        insertCellWithContent(row, getScriptSymbol(letter.toUpperCase()));
        insertCellWithContent(row, getSerifSymbol(letter));
        insertCellWithContent(row, getSerifSymbol(letter.toUpperCase()));
    });

    function insertCellWithContent(row, content) {
        const newCell = row.insertCell();
        const textNode = document.createTextNode(content);
        newCell.appendChild(textNode);
    }    
}

function setFocusOnSearchBar() {
    document.getElementById("search-bar").focus();
}

document.addEventListener('DOMContentLoaded', function () {
    populateTable();
    setFocusOnSearchBar();
});

