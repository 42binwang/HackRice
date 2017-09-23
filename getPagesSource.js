// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
    function Check(isReplace)
    {
        var keywords = ["suicide", "mutilation", "raid", "maltreat", "violence", "abuse", "crime", "bullyrag", "bullying", "bullyrag", "bullyragging"];
        var text = document.documentElement.outerHTML.toLowerCase();
        var flag = false;
        var senwords = [];

        for(var i=0; i<keywords.length; i++) {
            if (text.indexOf(keywords[i]) != -1) {
                console.log(keywords[i]);
                flag = true;
                // 把找到的敏感词放入数组中
                senwords.push(keywords[i]);
                String.prototype.str_times = function (max) {
                    var ret = this;
                    for (var i = 0; i < max - 1; i++) {
                        ret += this;
                    }
                    return ret;
                }
                if (isReplace) {
                    document.body.innerHTML = document.body.innerHTML.replace(new RegExp(keywords[i], 'gm'), "*".str_times(keywords[i].length))
                    document.body.innerHTML = document.body.innerHTML.replace(new RegExp(keywords[i].toUpperCase(), 'gm'), "*".str_times(keywords[i].length))
                    document.body.innerHTML = document.body.innerHTML.replace(new RegExp(keywords[i].substring(0, 1).toUpperCase() + keywords[i].substring(1), 'gm'), "*".str_times(keywords[i].length))
                }
            }
        }
        for(var i=0; i<senwords.length; i++) {
            console.log(senwords[i]);
        }
        return flag;
    }
    if(Check(1)==true) alert("FBI WARNING!!!!");
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});