function createContent() {
    
    var str = "";
    for (var i = 0; i < arguments.length; i++) {
        var postConent = i == (arguments.length - 1) ? "" : " ";
        str += arguments[i] + postConent;
    }
    
    return str;
}

function getEle(id) {
    return document.getElementById(id);
}