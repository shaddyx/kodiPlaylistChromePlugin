/**
 * Created by shaddy on 03.04.16.
 */
mainApp.service("RpcService", ["SettingsStorage", "$q", function(SettingsStorage, $q){
    this.makeRequest = function(params){
        var defer = $q.defer();
        $.ajax({
            url:SettingsStorage.getUrl(),// + "?request=" + JSON.stringify(params),
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data:JSON.stringify(params),
            dataType:"json",
            success:function(result){
                if (result.error){
                    console.error("Error rpc request", result.error, params);
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
    };
    this.call = function(method, params){
        console.log("calling method:" + method, params);
        return this.makeRequest({
            id:1,
            jsonrpc:"2.0",
            method:method,
            params:params
        });
    }
}]);