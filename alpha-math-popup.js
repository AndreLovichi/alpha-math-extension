const LATIN_ALPHABET = ["a", "b", "c", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function debug(text) {
    chrome.runtime.sendMessage({
        content: text,
        type: "debugPopup"
    });
}

function populateTable() {
    table = document.getElementById("symbol-table");
    LATIN_ALPHABET.forEach(letter => {
        const row = table.insertRow();
        insertClickableCell(row, getDoubleStruckSymbol(letter));
        insertClickableCell(row, getDoubleStruckSymbol(letter.toUpperCase()));
        insertClickableCell(row, getScriptSymbol(letter));
        insertClickableCell(row, getScriptSymbol(letter.toUpperCase()));
        insertClickableCell(row, getSerifSymbol(letter));
        insertClickableCell(row, getSerifSymbol(letter.toUpperCase()));
    });

    function insertClickableCell(row, symbol) {
        const newCell = row.insertCell();
        const textNode = document.createTextNode(symbol);
        newCell.appendChild(textNode);

        newCell.addEventListener('click', function() {
            copyToClipBoard(symbol);
        });
    }    
}

function copyToClipBoard(text) {
    chrome.runtime.sendMessage({
        content: text,
        type: "copyToClipboard"
    });
}

function setFocusOnSearchBar() {
    document.getElementById("search-bar").focus();
}

document.addEventListener('DOMContentLoaded', function () {
    populateTable();
    setFocusOnSearchBar();
});

