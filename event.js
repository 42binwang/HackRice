chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "getSource") {
        chrome.storage.local.set({ "sourceMsg": request.source }, function () {
            // message.innerText = "1";
            
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
        file: "sentimood.js"
    },
    function () {
        chrome.tabs.executeScript(null, {
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
    // var message = document.querySelector('#message');
    console.log("ppp");
    chrome.webNavigation.onCompleted.addListener(function(details) {
        console.log("test");
        console.log(details);
        if(details.frameId == 0)
            getSource();
    }); 

    chrome.webNavigation.onReferenceFragmentUpdated.addListener(function(details){
        console.log(details);
    })

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
        console.log(changeInfo);
    })

    //getSource();

}

window.onload = onWindowLoad;