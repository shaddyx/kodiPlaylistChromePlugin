
var BackgroundUtils = {
    sendMessageToContentScript: function(message, callBack){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, message, callBack);
        });
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
            console.log(type);
            if (this.__listeners[type]){
                for (var k in this.__listeners[type]){
                    this.__listeners[type][k][0].apply(this.__listeners[type][k][1], message.params)
                }
            }
        }
    }
};
chrome.runtime.onMessage.addListener(function(a,b){
    BackgroundUtils.__messageProcessor(a,b)
});