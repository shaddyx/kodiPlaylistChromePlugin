/**
 * Created by shaddy on 03.04.16.
 */
mainApp.controller("PlayListController", ["$scope", "BackgroundService", "InfoResolver", "PlayList", function($scope, BackgroundService, InfoResolver, PlayList){
    /** @type {MaterialObject[]} */
    $scope.urlObjects = [];
    $scope.working = false;
    $scope.showPlayList = function(){
        $scope.working = true;
        PlayList.show().finally(function(){
            $scope.working = false;
        });
    };

    $scope.clearPlayList = function(){
        $scope.working = true;
        PlayList.clear().finally(function(){
            $scope.working = false;
        });
    };
    $scope.checkAll = function(){
        for (var k in $scope.urlObjects){
            $scope.urlObjects[k].checked = true;
        }
    };
    $scope.unCheckAll = function(){
        for (var k in $scope.urlObjects){
            $scope.urlObjects[k].checked = false;
        }
    };
    $scope.addChecked = function(){
        var results = [];
        for (var k in $scope.urlObjects){
            if ($scope.urlObjects[k].checked){
                results.push($scope.urlObjects[k]);
            }
        }
        $scope.working = true;
        PlayList.show()
            .then(function(){
                return PlayList.addAll(results)
            })
            .then(function(){
                return PlayList.show();
            })
            .finally(function(){
                $scope.working = false;
            })
    };
    BackgroundService.addMessageListener("addPlayerItems", function(urlObjects){
        $scope.urlObjects = urlObjects;
        console.log("incoming objects", urlObjects);
        $scope.checkAll();
    });

    BackgroundService.sendMessageToContentScript("getItemList");
}]);