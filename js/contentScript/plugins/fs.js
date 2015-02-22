/**
 * Created by shaddy on 16.02.15.
 */
console.log("ex loaded");

ContentScriptUtils.addMessageListener("getItemList", function(){
    console.log("received getItemList message");
    var fileList = document.querySelector(".filelist .m-current");
    if (!fileList){
        return;
    }
    var elements = fileList.querySelectorAll(".m-file-new_type_video");
    var playerItems= [];
    for (var k in elements){
        if (!elements[k].tagName || ContentScriptUtils.isHidden(elements[k])){
            continue;
        }
        var title = elements[k].querySelector(".b-file-new__link-material-filename-text").innerHTML;
        var link = elements[k].querySelector("a[href^='/get/dl']").getAttribute("href");
        var item = new PlayerItem(title, "http://fs.to" + link);
        //item.setUseCaptionFromLocation(true);
        item.setUseUrlFromLocation(true);
        if (item.caption.endsWith(".avi") || item.caption.endsWith(".mkv") || item.caption.endsWith(".flv") || item.caption.endsWith(".mp4") || item.caption.endsWith(".xvid")){
            playerItems.push(item);
        }
    }
    console.log("adding player items", playerItems);
    ContentScriptUtils.addPlayerItems(playerItems);
});
