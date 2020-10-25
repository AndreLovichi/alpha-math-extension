function debug(text) {
    chrome.runtime.sendMessage({
        text,
        type: "debugPopup"
    });
}

debug("Running popup script...");

function clickHandler() {
    debug("Button clicked!")
  }

document.addEventListener('DOMContentLoaded', function () {
    debug("Loading complete!")

    document.querySelector('button').addEventListener('click', clickHandler);
});

