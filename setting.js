window.onload = function(){
    chrome.storage.local.get("sense",(items)=>{
        var show = document.getElementById("ww");
        show.innerHTML = items.sense;
        console.log(show)
        })

    var newword = document.getElementById("update");
    newword.onclick = function(){
        var newword = document.getElementById("newword");
        console.log(newword.value);
        
        chrome.storage.local.get("sense",(items)=>{
            console.log(newword.value);
            
            var words = items.sense;
            words.push(newword.value);
            console.log(words);
            chrome.storage.local.set({"sense":words});
            console.log(items.sense);

            var show = document.getElementById("ww");
            show.innerHTML = items.sense;
            console.log(show)   
            })
    }
    var thenewword = document.getElementById("newword");
    thenewword.onclick = function(){
        var tag = document.getElementsByTagName("input");
        for(var i = 0; i < tag.length; i++) {
            if(tag[i].id == "newword" ) {
                tag[i].value = "";
            }
        } 
    }

    var delet = document.getElementById("delete");
    delet.onclick = function() {
        var deleteword = document.getElementById("deleteword");
        chrome.storage.local.get("sense",(items)=>{
            var wholewords = items.sense;
            for(var k=0; k<wholewords; k++){
                if(wholewords[k] == deleteword.value){
                    wholewords.splice(k,1);
                }
            }
            chrome.storage.local.set({"sense":wholewords});
            console.log(items.sense);
            var show = document.getElementById("ww");
            show.innerHTML = items.sense;
            })
    }
    var deleteword = document.getElementById("deleteword");
    deleteword.onclick = function(){
        var tag = document.getElementsByTagName("input");
        for(var i = 0; i < tag.length; i++) {
            if(tag[i].id == "deleteword" ) {
                tag[i].value = "";
            }
        } 
    }

    var parentUnchecked = true;
    var parent = document.getElementById("parent");
    parent.onclick = function (passwd) {
        if (parentUnchecked) {
            var input = prompt("Password Required!", "Please Input password");
            var passwd = "123456";
            if (input != null && input == passwd) {
                var main = document.getElementById("main");
                var rules = document.getElementById("rules");
                var log = document.getElementById("log");
                main.className = "tab";
                rules.className = "tab";
                log.className = "tab";
                parentUnchecked = false;
                //alert(main.className);
                alert("Correct!");
            } else {
                alert("Wrong password");
            }
        }
    }

}

function update(){
    console.log(1);
}




// chrome.storage.local.get("sense",(items)=>{
    
//     var words = items.sense;
//     words.push(newword.value);
//     console.log(words);
//     chrome.storage.local.set({"sense":words});
//     })