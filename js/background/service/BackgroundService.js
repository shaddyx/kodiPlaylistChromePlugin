/**
 * Created by shaddy on 03.04.16.
 */
mainApp.service("BackgroundService", [function(){
    chrome.runtime.onMessage.addListener(function(a,b){
        if (typeof message === "object" && message.msgType === "message"){
            var type = message.type;
            console.log("Incoming message:" + type);
            //$scope.$broadcast(type, message.params);
        }
    });
}]);
mainApp.run(["BackgroundService", function(BackgroundService){

}]);