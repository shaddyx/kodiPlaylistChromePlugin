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
            if (item.caption.endsWith(".avi") || item.caption.endsWith(".mkv") || item.caption.endsWith(".flv") || item.caption.endsWith(".mp4") || item.caption.endsWith(".xvid")){
                playerItems.push(item);
            }
        }
    }
    console.log("adding items:", playerItems);
    ContentScriptUtils.addPlayerItems(playerItems);
});
