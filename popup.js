var setting;

window.onload = function () {
    setting = document.querySelector('#setting');
    setting.onclick = function () { test(); };
}

function test() {
    var newURL = "setting.html";
    chrome.tabs.create({ url: newURL });
}