/**
 * Created by shaddy on 03.04.16.
 */
mainApp.controller("SettingsController", ["$scope", "SettingsStorage", "Kodi", "$timeout", function($scope, SettingsStorage, Kodi, $timeout){
    var CHECK_TIMEOUT = 3000;
    var my = this;
    $scope.connected = false;
    $scope.url = SettingsStorage.getUrl();

    $scope.save = function(){
        SettingsStorage.setUrl($scope.url);
    };

    $scope.cancel = function(){
    };

    var scheduleCheck = function(){
        check(function(){
            console.log("scheduling");
            my.checkTimer && $timeout.cancel(my.checkTimer);
            my.checkTimer = $timeout(scheduleCheck, CHECK_TIMEOUT);
        });
    };

    var check = function(done){
        Kodi.checkConnection($scope.url).then(function(){
            console.log("ok");
            $scope.connected = true;
            done();
        }).catch(function(){
            console.log("fail");
            $scope.connected = false;
            done();
        });
    };

    scheduleCheck();

}]);