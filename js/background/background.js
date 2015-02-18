/**
 * Created by shaddy on 16.02.15.
 */
window.addEventListener("load", function() {

});


BackgroundUtils.addMessageListener("testMessage", function(a, b){
   console.log("testMessage called with params", a, b);
});