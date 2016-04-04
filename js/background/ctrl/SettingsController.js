/**
 * Created by shaddy on 03.04.16.
 */
mainApp.controller("SettingsController", ["$scope", "SettingsStorage", function($scope, SettingsStorage){
    $scope.url = SettingsStorage.getUrl();
    $scope.save = function(){
        SettingsStorage.setUrl($scope.url);
    };
    $scope.cancel = function(){
    };
}]);