/**
 * Created by shaddy on 03.04.16.
 */
mainApp.service("Kodi", ["$q", "RpcService", function($q, RpcService){
    var my = this;
    /**
     * 
     * @param item
     * @returns {*}
     */
    this.getProperties = function(props){
        return RpcService.call("Application.GetProperties", {properties: props});
    };

    this.checkConnection = function(url){
        var defer = $q.defer();
        $.ajax({
            url:url,
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data:JSON.stringify({"jsonrpc": "2.0", "method": "Application.GetProperties", "params": {"properties": ["volume"]}, "id": 1}),
            dataType:"json",
            success:function(result){
                if (result.error){
                    defer.reject(result.error);
                } else {
                    defer.resolve(result.result);
                }
            },
            error:function(err){
                defer.reject(err);
            }
        });
        return defer.promise;
    }
}]);