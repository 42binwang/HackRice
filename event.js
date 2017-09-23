chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "getSource") {
        chrome.storage.local.set({ "sourceMsg": request.source }, function () {
            //message.innerText = request.source;
            filterMsg();
        });
    }

    if (request.action == "filterWord") {
        chrome.storage.local.set({ "keyWord": request.source }, function () {
            logKeyWord();
        })
    }
});

function filterMsg() {
    chrome.tabs.executeScript(null, {
        file: "FilterKeyWord.js"
    },
    function () {
        if (chrome.runtime.lastError) {
            //message.innerText = 'There was an error filterMsg script : \n' + chrome.runtime.lastError.message;
        }
    });
}

function logKeyWord() {
    chrome.tabs.executeScript(null, {
        file: "logKeyWords.js"
    }),
    function () {
        if (chrome.runtime.lastError) {
            //message.innerText = 'There was an error filterMsg script : \n' + chrome.runtime.lastError.message;
        }
    }
}

function getSource() {
    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    },
    function () {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            //message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    });
}

function onWindowLoad() {
    //var message = document.querySelector('#message');
    chrome.webNavigation.onCompleted.addListener(getSource);
    chrome.webNavigation.onHistoryStateUpdated.addListener(getSource);
    setInterval(getSource, 1000);
}

window.onload = onWindowLoad;