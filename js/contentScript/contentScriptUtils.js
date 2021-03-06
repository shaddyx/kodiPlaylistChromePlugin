/**
 * Created by shaddy on 18.02.15.
 */
/**
 *
 * @param caption
 * @param url
 * @constructor
 */
var PlayerItem = function(caption, url){
    this.caption = caption;
    this.url = url;
    this.redirrect = false;
    this.useCaptionFromLocation = false;
    this.useUrlFromLocation = false;
};

PlayerItem.prototype.setRedirrect = function(redirrect){
    this.redirrect = !!redirrect;
};

/**
 * note that if useCaptionFromLocation == true - server will add the caption from header location file name
 */
PlayerItem.prototype.setUseCaptionFromLocation = function(useCaptionFromLocation){
    this.useCaptionFromLocation = !!useCaptionFromLocation;
};

PlayerItem.prototype.setUseUrlFromLocation = function(useUrlFromLocation){
    this.useUrlFromLocation = !!useUrlFromLocation;
};

PlayerItem.prototype.getForJson = function(){
    var obj = {};
    for (var k in this){
        if (k[0] != '_' && typeof this[k] != 'function'){
            obj[k] = this[k];
        }
    }
    return obj;
};

String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) === 0;
}

String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
};

ContentScriptUtils = {
    isHidden:function (el) {
        var style = window.getComputedStyle(el);
        return (style.display === 'none')
    },
    __sendMessageToBackground:function(message, callBack){
        chrome.runtime.sendMessage(message, function(response) {
            //callBack(response);
        });
    },
    sendMessageToBackground:function(type){
        var args = [];
        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        var obj = {
            msgType:"message",
            type:type,
            params:args
        };
        this.__sendMessageToBackground(obj);
    },
    __listeners:{},
    addMessageListener:function(type, func, obj){
        this.__listeners[type] = this.__listeners[type] || [];
        this.__listeners[type].push([func, obj]);
    },
    removeMessageListener:function(type, func, obj){
        if (this.__listeners[type]){
            for (var k in this.__listeners[type]){
                var listener = this.__listeners[type];
                if (listener[0] === func && listener[1] === obj){
                    this.__listeners[type].splice(k, 1);
                    return;
                }
            }
        }
    },
    __messageProcessor:function(message, sender, sendResponse) {
        console.log("received message", message);
        if (typeof message === "object" && message.msgType === "message"){
            var type = message.type;
            if (this.__listeners[type]){
                for (var k in this.__listeners[type]){
                    this.__listeners[type][k][0].apply(this.__listeners[type][k][1], message.params)
                }
            }
        }
    },
    addPlayerItems:function(items){
        this.sendMessageToBackground("addPlayerItems", items);
    }
};
chrome.runtime.onMessage.addListener(function(a,b){
    ContentScriptUtils.__messageProcessor(a,b);
});