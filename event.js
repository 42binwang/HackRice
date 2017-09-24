var useSwitch = localStorage.useSwitch;
var filterSwitch = localStorage.filterSwitch;
var chickenSoupSwitch = localStorage.chickenSoupSwitch;
var keyWordsSwitch = localStorage.keyWordsSwitch;

chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "getSource") {
        chrome.storage.local.set({ "sourceMsg": request.source }, function () {
            filterMsg();
        });
    }

    if (request.action == "filterWord") {
        chrome.storage.local.set({ "keyWord": request.source }, function () {
            logKeyWord();
        })
    }

    if (request.action == "changeUseSwitch") {
        console.log("changeUseSwitch")
        useSwitch = request.source;
        chrome.storage.local.set({ "useSwitch": useSwitch });
        localStorage.useSwitch = useSwitch;
    }

    if (request.action == "changeFilterSwitch") {
        filterSwitch = request.source;
        chrome.storage.local.set({ "filterSwitch": filterSwitch });
        localStorage.filterSwitch = filterSwitch;
    }

    if (request.action == "changeChickenSoupSwitch") {
        chickenSoupSwitch = request.source;
        chrome.storage.local.set({ "chickenSoupSwitch": chickenSoupSwitch });
        localStorage.chickenSoupSwitch = chickenSoupSwitch;
    }

    if (request.action == "changeKeyWordsSwitch") {
        keyWordsSwitch = request.source;
        chrome.storage.local.set({ "keyWordsSwitch": keyWordsSwitch });
        localStorage.keyWordsSwitch = keyWordsSwitch;
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

function getSource(tabId) {
    chrome.tabs.executeScript(tabId, {
        file: "sentimood.js"
    },
    function () {
        chrome.tabs.executeScript(tabId, {
            file: "getPagesSource.js"
        },
        function () {
            // If you try and inject into an extensions page or the webstore/NTP you'll get an error
            if (chrome.runtime.lastError) {
                //message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
            }
        }); 
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            //message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    });
}

function onWindowLoad() {

    chrome.storage.local.set({ "useSwitch": useSwitch });
    chrome.storage.local.set({ "filterSwitch": filterSwitch });
    chrome.storage.local.set({ "chickenSoupSwitch": chickenSoupSwitch });
    chrome.storage.local.set({ "keyWordsSwitch": keyWordsSwitch });
    console.log(useSwitch);

    chrome.webNavigation.onCompleted.addListener(function (details) {
        console.log(useSwitch);
        if ((details.frameId == 0) && useSwitch == true) {
            console.log("here" + (details.frameId == 0 && useSwitch));
            getSource(details.tabId);
        }
    }); 

    chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
        console.log(useSwitch);
        if (details.frameId == 0 && useSwitch == true) {
            console.log("here2");
            setTimeout(getSource, 3000, details.tabId)
        }
    })
}

window.onload = onWindowLoad;