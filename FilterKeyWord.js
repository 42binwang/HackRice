function FilterKeyWord() {
    // To Implement
    chrome.storage.local.get("sourceMsg", function (data) {
        //console.log(data);
    });
}

chrome.runtime.sendMessage({
    action: "filterWord",
    source: FilterKeyWord()
});