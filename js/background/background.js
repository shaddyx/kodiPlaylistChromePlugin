/**
 * Created by shaddy on 16.02.15.
 */
window.addEventListener("load", function() {
    window.setInterval( function() {
        console.log("Hello world");
        BgUtils.sendMessageToContentScript({test:"test"}, function(responce){
            console.log("resp:", responce);
        });
        console.log("message sent");
    }, 1000);
});