window.onload = function(){
    chrome.storage.local.get("sense",(items)=>{
        var show = document.getElementById("ww");
        show.innerHTML = items.sense;
        })
//store the word you input in the database
    var newword = document.getElementById("update");
    newword.onclick = function(){
        var newword = document.getElementById("newword");
        console.log(newword.value);
        
        chrome.storage.local.get("sense",(items)=>{
            var words = items.sense;
            var contains = false;
            //if the word is already in the database, don't store it again
            for(var i=0; i<words.length; i++) {
                if(words[i] == newword.value) contains = true;
            }
            if(!contains) words.push(newword.value);
            chrome.storage.local.set({"sense":words});
            var show = document.getElementById("ww");
            show.innerHTML = items.sense;
            })
    }
//clear the input 
    var thenewword = document.getElementById("newword");
    thenewword.onclick = function(){
        thenewword.value = "";
    }
//delete the word you input from the database
    var delet = document.getElementById("delete");
    delet.onclick = function() {
        var deleteword = document.getElementById("deleteword");
        chrome.storage.local.get("sense",(items)=>{
            var wholewords = items.sense;
            for(var k=0; k<wholewords.length; k++){
                if(wholewords[k] == deleteword.value){
                    wholewords.splice(k,1);
                }
            }
            chrome.storage.local.set({"sense":wholewords});
            var show = document.getElementById("ww");
            show.innerHTML = items.sense;
            })
    }
    //clear the input
    var deleteword = document.getElementById("deleteword");
    deleteword.onclick = function(){
        deleteword.value = "";
    }

    var parentUnchecked = true;
    var parent = document.getElementById("parent");
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