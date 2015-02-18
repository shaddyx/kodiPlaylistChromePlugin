/**
 * Created by shaddy on 16.02.15.
 */
window.addEventListener("load", function() {

});

var urls = [];

var renderUrls = function(){
   var table = document.getElementById("contentList");
   for (var k in urls){
      var caption = urls[k].caption;
      var url = urls[k].url;
      var row = table.insertRow(k + 1);
      row.insertCell(0).innerHTML = caption;
      row.insertCell(1).innerHTML = '<button type="button" class="btn btn-default">add</button>'
   }
};

var clearList = function(){
   urls = [];
   var table = document.getElementById("contentList");
   table.innerHTML = "<tr><th>name</th><th>add</th></tr>";
};

BackgroundUtils.addMessageListener("clearList", function(){
   clearList();
   renderUrls();
});
BackgroundUtils.addMessageListener("addPlayerItem", function(urlObjects){
   urls.push(urlObject);
   renderUrls();
});