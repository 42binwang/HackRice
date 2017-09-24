window.onload = function(){
    var keywords = ["suicide", "mutilation", "raid", "maltreat", "violence", "abuse", "crime", "bullyrag"];
    var show = document.getElementById("ww");
    show.innerHTML = keywords;
    
//store the word you input in the database
    var newword = document.getElementById("update");
    newword.onclick = function(){
        var newword = document.getElementById("newword");
        console.log(newword.value);
        
        var contains = false;
        //if the word is already in the database, don't store it again
        for(var i=0; i<keywords.length; i++) {
            if(keywords[i] == newword.value) contains = true;
        }
        if(!contains) keywords.push(newword.value);
        
        // var show = document.getElementById("ww");
        show.innerHTML = keywords;
        chrome.storage.local.set({"sense":keywords});
        
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
        
            for(var k=0; k<keywords.length; k++){
                if(keywords[k] == deleteword.value){
                    keywords.splice(k,1);
                }
            }
            
            // var show = document.getElementById("ww");
            chrome.storage.local.set({"sense":keywords});
            show.innerHTML = keywords;
            
    }
    //clear the input
    var deleteword = document.getElementById("deleteword");
    deleteword.onclick = function(){
        deleteword.value = "";
    }

    var parentUnchecked = true;
    var parent = document.getElementById("parent");
	parent.onclick=function(){
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

    //the code for log
    var showurl = document.getElementById("showurl");
    chrome.storage.local.get("url",(items)=>{
        var urls = items.url;
        var result = "";
        for(var i=0; i<urls.length;i++){
            console.log(urls[i])
            result += urls[i]+"<br>";
        }
        showurl.innerHTML = result;

    })

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