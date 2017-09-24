angular.module('settingApp', [])
  .controller('mainSettingController', function ($scope) {
      var mainSetting = this;

      mainSetting.useSwitch = true;
      mainSetting.filterSwitch = true;
      mainSetting.chickenSoupSwitch = true;
      mainSetting.keyWordsSwitch = true;

      chrome.storage.local.get("useSwitch", (items) => {
          if (items.useSwitch != undefined) {
              mainSetting.useSwitch = items.useSwitch;
          }
          $scope.$apply();
      });

      chrome.storage.local.get("filterSwitch", (items) => {
          if (items.filterSwitch != undefined) {
              mainSetting.filterSwitch = items.filterSwitch;
          }
          $scope.$apply();
      });

      chrome.storage.local.get("chickenSoupSwitch", (items) => {
          if (items.chickenSoupSwitch != undefined) {
              mainSetting.chickenSoupSwitch = items.chickenSoupSwitch;
          }
          $scope.$apply();
      });

      chrome.storage.local.get("keyWordsSwitch", (items) => {
          if (items.keyWordsSwitch != undefined) {
              mainSetting.keyWordsSwitch = items.keyWordsSwitch;
          }
          $scope.$apply();
      });

      mainSetting.changeUseSwitch = function () {
          chrome.runtime.sendMessage({
              action: "changeUseSwitch",
              source: mainSetting.useSwitch
          });
      }

      mainSetting.changeFilterSwitch = function () {
          chrome.runtime.sendMessage({
              action: "changeFilterSwitch",
              source: mainSetting.filterSwitch
          });
      }

      mainSetting.changeChickenSoupSwitch = function () {
          chrome.runtime.sendMessage({
              action: "changeChickenSoupSwitch",
              source: mainSetting.chickenSoupSwitch
          });
      }

      mainSetting.changeKeyWordsSwitch = function () {
          chrome.runtime.sendMessage({
              action: "changeKeyWordsSwitch",
              source: mainSetting.keyWordsSwitch
          });
      }

      chrome.runtime.onMessage.addListener(function (request, sender) {
          if (request.action == "changeUseSwitch") {
              mainSetting.useSwitch = request.source;
              $scope.$apply();
          }
      });

  })
.controller("ruleListController", function () {
    var ruleList = this;

    ruleList.rules = ["suicide", "mutilation", "raid", "maltreat", "violence", "abuse", "crime", "bullyrag"];

    ruleList.deleteRule = function (rule) {
        for (var i = 0; i < ruleList.rules.length; i++) {
            if (ruleList.rules[i] == rule) {
                ruleList.rules.splice(i, 1);
            }
        }
        // var show = document.getElementById("ww");
        chrome.storage.local.set({ "sense": ruleList.rules });
    }

    ruleList.addRule = function (rule) {
        var contains = false;
        //if the word is already in the database, don't store it again
        for (var i = 0; i < ruleList.rules.length; i++) {
            if (ruleList.rules[i] == rule) {
                contains = true;
                break;
            } 
        }
        if (!contains) ruleList.rules.push(rule);
        chrome.storage.local.set({ "sense": ruleList.rules });
    }
}).
    controller("parentController", function () {
        var parent = this;

        console.log(localStorage);
        parent.pass = false;
        parent.hasPass = !(localStorage.parentPassword == undefined);
        console.log(parent.hasPass)

        parent.confirmPassword = function (password) {
            if (localStorage.parentPassword == password) {
                parent.pass = true;
                return true;
            }
        }

        parent.setPassword = function (password) {
            console.log(localStorage);
            localStorage.parentPassword = password;
            parent.pass = false;
            parent.hasPass = true;
        }
        
        parent.deletePassword = function (password) {
            console.log("here");
            if (parent.confirmPassword(password))
                localStorage.removeItem("parentPassword");
            parent.pass = true;
            parent.hasPass = false;
        }
    })

window.onload = function () {
    /*
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
    }*/

    /*
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
    }*/

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