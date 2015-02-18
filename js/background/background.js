/**
 * Created by shaddy on 16.02.15.
 */

var urls = [];

var renderUrls = function(){
   var table = document.getElementById("contentList");
   for (var k in urls){
      var caption = urls[k].caption;
      console.log("adding row:", urls[k]);
      var url = urls[k].url;
      var row = table.insertRow(table.rows.length);
      row.insertCell(0).innerHTML = caption;
      row.insertCell(1).innerHTML = '<button type="button" class="btn btn-default">add</button>'
   }
};

var clearList = function(){
   urls = [];
   var table = document.getElementById("contentList");
   table.innerHTML = "<tr><th>name</th><th>add</th></tr>";
};

BackgroundUtils.addMessageListener("addPlayerItems", function(urlObjects){
   console.log("incoming objects", urlObjects);
   clearList();
   urls = urlObjects;
   renderUrls();
});

window.addEventListener("load", function() {
   console.log("sending setItemList", new Date())
   clearList();
   BackgroundUtils.sendMessageToContentScript("getItemList");
});

