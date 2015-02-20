/**
 * Created by shaddy on 20.02.15.
 */
var RPC = function(url){
    this.url = url;
};

RPC.prototype.makeRequest = function(params){
    $.ajax({
        url:params.url,
        method:"POST",
        data:params.data,
        dataType:"json",
        success:params.success,
        error:params.error
    })
};


RPC.prototype.call = function(method, params, options){
    options = options || {};
    var jsonRpc = {
        jsonrpc:"2.0",
        id:'1',
        method:method,
        params:params
    };
    this.makeRequest({
        url:this.url,
        data:{jsonrpc:jsonRpc},
        success:options.success,
        error:options.error
    });
};
RPC.prototype.setUrl = function(url){
    this.url = url;
};

RPC.prototype.playListAdd = function(file){
    this.call("Playlist.add", {
        playlistid:1,
        item:{file:file}
    });
};


var rpc = new RPC();