/**
 * Created by shaddy on 16.02.15.
 */
console.log("ex loaded");

ContentScriptUtils.addMessageListener("getItemList", function(){
    console.log("received getItemList message");
    var elements = document.querySelectorAll("a[href^='/get/'][title]");
    var playerItems= [];
    for (var k in elements){
        if (elements[k].tagName === "A"){
            playerItems.push(new PlayerItem(elements[k].getAttribute("title"), elements[k].getAttribute("href")));
        }
    }
    ContentScriptUtils.addPlayerItems(playerItems);
});
