/**
 * Created by shaddy on 16.02.15.
 */
console.log("ex loaded");

ContentScriptUtils.addMessageListener("getItemList", function(){
    var player = document.querySelector("#video_player");
    console.log("player is:", player);
    if (player){
        var re = /url([0-9]{1,4})=(.*?)&/g;
        //decodeURIComponent((new RegExp('url[0-9]{1,4}=(.*?)&')).exec(document.querySelector("embed").getAttribute("flashvars"))[1])
        var varsStr = player.getAttribute("flashvars");
        var res;
        var items = [];
        while (res = re.exec(varsStr)){
            var url = res[2];
            var title = "Vk video (" + res[1] +")";
            var item = new PlayerItem(title, url);
            console.log("adding item", item);
            items.push(item);
        }
        ContentScriptUtils.addPlayerItems(items);
    }
});
