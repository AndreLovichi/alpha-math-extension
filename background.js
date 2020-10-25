function consoleLogFromPopup(text) {
    console.log(text);
}

function copyToClipboard(text) {
    // Source: https://gist.github.com/joeperrin-gists/8814825
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = 0;    
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('Copy');
    document.body.removeChild(textarea);
}

chrome.runtime.onMessage.addListener(function(message){
    switch (message.type) {
        case "copyToClipboard":
            copyToClipboard(message.content)
            break;

        case "debugPopup": 
            consoleLogFromPopup(message.content);
            break;
    }
});