/**
 * Created by shaddy on 18.02.15.
 */
ContentScriptUtils = {
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
        if (typeof message === "object" && message.msgType === "message"){
            var type = message.type;
            if (this.__listeners[type]){
                for (var k in this.__listeners[type]){
                    this.__listeners[type][k][0].apply(this.__listeners[type][k][1], message.params)
                }
            }
        }
    },
    addPlayerItem:function(caption, url){
        this.sendMessageToBackground("addPlayerItem", {caption:caption, url:url});
    }
};
chrome.runtime.onMessage.addListener(function(a,b){
    ContentScriptUtils.__messageProcessor(a,b);
});