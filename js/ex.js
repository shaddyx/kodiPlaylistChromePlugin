/**
 * Created by shaddy on 16.02.15.
 */
console.log("ex loaded");

chrome.runtime.onMessage.addListener(function(message, sender, callBack){
    console.log("Message", message);
    return {a:"b"};
});

console.log("listener added");