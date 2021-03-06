/**
 * Created by shaddy on 03.04.16.
 */
mainApp.service("BackgroundService", [function(){
    var my = this;
    this.__listeners = {};
    this.sendMessageToContentScript = function(type){
        var callBack = function(){

        };
        var args = [];
        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        var obj = {
            msgType:"message",
            type:type,
            params:args
        };

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, obj, callBack);
        });
    };
    this.addMessageListener = function(type, func, obj){
        this.__listeners[type] = this.__listeners[type] || [];
        this.__listeners[type].push([func, obj]);
    };
    this.removeMessageListener = function(type, func, obj){
        if (this.__listeners[type]){
            for (var k in this.__listeners[type]){
                var listener = this.__listeners[type];
                if (listener[0] === func && listener[1] === obj){
                    this.__listeners[type].splice(k, 1);
                    return;
                }
            }
        }
    };
    this.__messageProcessor = function(message, sender, sendResponse) {
        if (typeof message === "object" && message.msgType === "message"){
            var type = message.type;
            console.log(type);
            if (this.__listeners[type]){
                for (var k in this.__listeners[type]){
                    this.__listeners[type][k][0].apply(this.__listeners[type][k][1], message.params)
                }
            }
        }
    };
    chrome.runtime.onMessage.addListener(function(a,b){
        my.__messageProcessor(a,b);
    });
}]);