/**
 * Created by shaddy on 03.04.16.
 */
mainApp.service("PlayList", ["InfoResolver", "$q", "RpcService", function(InfoResolver, $q, RpcService){
    var my = this;
    /**
     *
     * @param item {MaterialObject}
     * @returns {*}
     */
    this.add = function(item){
        console.log("adding:", item);
        var promise = function(){
            return RpcService.call("PlayList.add", {
                playlistid:1,
                item:{
                    file:item.url
                }
            });
        };
        if (item.useUrlFromLocation){
            return InfoResolver.extractInfo(item.url)
                .then(function(data){
                    item.url = data.url;
                }).then(promise);
        } else {
            return promise();
        }

    };
    /**
     *
     * @param list {MaterialObject[]}
     * @returns {Promise}
     */
    this.addAll = function (list){
        var result = false;
        for (var k in list){
            (function(k){
                if (!result){
                    console.log("first:", list[k]);
                    result = $q(function(resolve){
                        return my.add(list[k]).then(resolve);
                    });
                } else {
                    console.log("next:", list[k]);
                    result = result.then(function(){
                        return my.add(list[k]);
                    });
                }
            })(k);
        }
        return result;
    };
    this.show = function(){
        return RpcService.call("GUI.ActivateWindow", {
            window:"videoplaylist"
        })
    };
    this.clear = function(){
        return RpcService.call("Playlist.Clear", {
            playlistid:1
        });
    }
}]);