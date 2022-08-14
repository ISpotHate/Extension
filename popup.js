/// Popup script accesses popup, content script accesses site

window.addEventListener('DOMContentLoaded', (event) => {
    setInterval(function(){
        chrome.storage.local.get(['type'], function(result) {
            console.log('Value currently is ' + result.key);
        });
        if (hrome.storage.local.get(['type']) == "homophobia"){
            document.getElementById('start').hidden = true;
            document.getElementById('homophobia').hidden = false;
            document.getElementById('hate').hidden = true;
        }
        else if (hrome.storage.local.get(['type'] == "hate"){
            document.getElementById('start').hidden = true;
            document.getElementById('homophobia').hidden = true;
            document.getElementById('hate').hidden = false;
        }
        else {
            document.getElementById('start').hidden = false;
            document.getElementById('homophobia').hidden = true;
            document.getElementById('hate').hidden = true;
        }
    }, 2000);
});
