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
            var item = new PlayerItem(elements[k].getAttribute("title"), "http://ex.ua" + elements[k].getAttribute("href"));
            //item.setUseCaptionFromLocation(true);
            item.setUseUrlFromLocation(true);
            playerItems.push(item);
        }
    }
    ContentScriptUtils.addPlayerItems(playerItems);
});
