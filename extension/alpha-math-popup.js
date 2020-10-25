const LATIN_ALPHABET = ["a", "b", "c", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function debug(text) {
    chrome.runtime.sendMessage({
        content: text,
        type: "debugPopup"
    });
}

function populateTable() {
    const table = document.getElementById("symbol-table");
    LATIN_ALPHABET.forEach(letter => {
        const row = table.insertRow();
        row.setAttribute("search-key", letter);
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
            showCopiedSymbol(symbol);
        });
    }

    function copyToClipBoard(text) {
        chrome.runtime.sendMessage({
            content: text,
            type: "copyToClipboard"
        });
    }

    function showCopiedSymbol(symbol) {
        document.getElementById("copy-result").classList.remove("hidden");
        document.getElementById("copied-symbol").innerText = symbol;
    }
}


function addListenerOnSearchBar() {
    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("input", function() {
        const currentSearch = searchBar.value;
        debug(`Search bar: ${currentSearch}`);
        filterTable(currentSearch);    
    })

    function filterTable(currentSearch) {
        showAllRows();

        if (currentSearch !== "") {
            hideRows(currentSearch);            
        }
    }

    function showAllRows() {
        const table = document.getElementById("symbol-table");
        const rows = table.getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
            rows[i].classList.remove("hidden");
        }
    }

    function hideRows(currentSearch) {
        const table = document.getElementById("symbol-table");
        const rows = table.getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].getAttribute("search-key") !== currentSearch.toLowerCase()) {
                rows[i].classList.add("hidden");
            }
        }
    }    
}

function setFocusOnSearchBar() {
    document.getElementById("search-bar").focus();
}

document.addEventListener('DOMContentLoaded', function () {
    populateTable();
    addListenerOnSearchBar();
    setFocusOnSearchBar();
});

