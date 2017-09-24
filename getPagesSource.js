// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
            html += node.innerText;
            break;
        case Node.TEXT_NODE:
            html += node.innerText;
            break;
        case Node.CDATA_SECTION_NODE:
            //html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            //html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            //html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return html;
}

function Check(isReplace)
{
    var keywords = ["suicide", "mutilation", "raid", "maltreat", "violence", "abuse", "crime", "bullyrag", "bullying", "bullyrag", "bullyragging"];
    var text = document.body.innerHTML.toLowerCase();
    var flag = false;
    var senwords = [];

    //console.log(text);

    for(var i=0; i<keywords.length; i++) {
        if (text.indexOf(keywords[i]) != -1) {
            console.log(keywords[i]);
            flag = true;
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

function Run() {    
    console.log("Test");
    if(Check(1)==true) alert("Need Help?");
    else{
        var text = DOMtoString(document).toLowerCase();
        var sentimood = new Sentimood();
        var analysis = sentimood.analyze(text);
        if(analysis["score"]<-100) alert("Negative News!");
    }
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: Run()
});