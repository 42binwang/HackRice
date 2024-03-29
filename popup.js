window.onload = function () {
    var setting = document.querySelector('#setting');
    setting.onclick = function () { openSetting(); };
}

function openSetting() {
    var newURL = "setting.html";
    chrome.tabs.create({ url: newURL });
}

angular.module('popupApp', [])
  .controller('useSwitchController', function ($scope) {
      var useSwitch = this;
      useSwitch.useSwitch = true;

      chrome.storage.local.get("useSwitch", (items) => {
          if (items.useSwitch != undefined) {
              useSwitch.useSwitch = items.useSwitch;
          }
          $scope.$apply();
      });

      useSwitch.changeUseSwitch = function () {
          chrome.runtime.sendMessage({
              action: "changeUseSwitch",
              source: useSwitch.useSwitch
          });
      }

      chrome.runtime.onMessage.addListener(function (request, sender) {
          if (request.action == "changeUseSwitch") {
              useSwitch.useSwitch = request.source;
              $scope.$apply();
          }
      });
  })
    .controller('chickenSoupSwitchController', function ($scope) {
        var chickenSoupSwitch = this;

        chickenSoupSwitch.chickenSoupSwitch = true;

        chrome.storage.local.get("chickenSoupSwitch", (items) => {
            if (items.chickenSoupSwitch != undefined) {
                chickenSoupSwitch.chickenSoupSwitch = items.chickenSoupSwitch;
            }
            $scope.$apply();
        });

        chrome.runtime.onMessage.addListener(function (request, sender) {
            if (request.action == "chickenSoupSwitch") {
                chickenSoupSwitch.chickenSoupSwitch = request.source;
                $scope.$apply();
            }
        });
    })
    .controller('keyWordsSwitchController', function ($scope) {
        var keyWordsSwitch = this;

        keyWordsSwitch.keyWordsSwitch = true;

        chrome.storage.local.get("keyWordsSwitch", (items) => {
            if (items.keyWordsSwitch != undefined) {
                keyWordsSwitch.keyWordsSwitch = items.keyWordsSwitch;
            }
            $scope.$apply();
        });

        chrome.runtime.onMessage.addListener(function (request, sender) {
            if (request.action == "keyWordsSwitch") {
                keyWordsSwitch.keyWordsSwitch = request.source;
                $scope.$apply();
            }
        });
    })
    .controller('chickenListController', function () {
        var chickenList = this;
        chickenList.chickens = [
          "Memories, beautiful very hurt, memories, memories of the past but can not go back.",
          "If you want to be happy, set a goal that commands your thoughts, liberates your energy, and inspires your hopes.",
          "Some people come into our lives and leave footprints on our hearts. Others come into our lives and make us wanna leave footprints on their face.",
          "Do not delay anything that adds laughter and joy to your life.",
            "You do not need a crystal ball. Knowing what steps to take makes life boring. Take life one day at a time. Enjoy the surprises life throws at you. ",
            "All love is sweet, given or returned. Common as light is loved, and its familiar voice wearies not ever.",
            "Although you spent your previous time without me, I can not live the rest of my life without you. ",
            "Everything changes, Time Changes, People changes, Love changes. However, it doesn't matter, because You are the reason I am!",
            "First i need your hand ,then forever can begin.",
            "We can't all be heroes. Somebody has to sit on the curb and clap as they go by.",
            "In order to be irreplaceable, one must always be different.",
            "Eat to live, but not live to eat.",
            "When a girl tells you about her problems it does not mean that she complains.She trusts you.",
            "If everything seems under control, you're just not going fast enough.",
            "There's no place like home.",
            "If you wish to succeed, you should use persistence as your good friend, experience as your reference, prudence as your brother and hope as your sentry.",
            "To not forgive is like drinking poison and waiting for the other person to die."];
        chickenList.generateShowList = function (num) {
            var size = chickenList.chickens.length;
            var showList = [];
            for (var i = 0; i < num; i++) {
                showList.push(chickenList.chickens[Math.floor(Math.random() * size)]);
            }
            return showList;
        }
        chickenList.showList = chickenList.generateShowList(3);
    })
    .controller('keyWordListController', function ($scope) {
        var keyWordList = this;

        keyWordList.keyWords = [];
       

        chrome.storage.local.get("detected", (items) => {
            keyWordList.keyWords = items.detected;
            console.log(keyWordList.keyWords);
            $scope.$apply();
        });

        // keyWordList.keyWords = localStorage.words;
        // console.log(keyWordList.keyWords);
        // $scope.$apply();

    });
