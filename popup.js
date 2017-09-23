var setting;
var chickens=["xiaoming wants to die","hong is saved","Tang Mo","Qiu Weiheng","Huang Siqi","Zhang Yunxiang","Wang Bing"];
window.onload = function () {
    setting = document.querySelector('#setting');
    setting.onclick = function () { test(); };
    chrome.storage.local.get("sense",(items)=>{
        console.log(items);
        var words = items.sense;
        for(var i=0; i<words.length;i++){
            console.log(words[i]);
            var doc = document.getElementById(words[i]);
            doc.style.display = "block";
            doc.innerHTML = "Do Not "+words[i]+'!\r'+chickens[Math.floor(chickens.length*Math.random())];
        }
        })
    

    
}

function test() {
    var newURL = "setting.html";
    chrome.tabs.create({ url: newURL });
}