/**
 * Created by shaddy on 16.02.15.
 */
window.addEventListener("load", function() {
    window.setInterval( function() {
        console.log("Hello world");
        chrome.runtime.sendMessage({test:"test"});
        console.log("message sent");
    }, 1000);
});