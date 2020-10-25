chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message.type == "debugPopup") { 
        console.log(message.text);
    }
});