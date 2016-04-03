/**
 * Created by shaddy on 20.02.15.
 */
var RPC = function(url){
    this.url = url;
};

RPC.prototype.makeRequest = function(params){
    $("button").attr("disabled", "disabled");
    $.ajax({
        url:params.url,
        method:"POST",
        data:params.data,
        dataType:"json",
        success:function(result){
            $("button").removeAttr("disabled");
            params.success(result);
        },
        error:function(err){
            $("button").removeAttr("disabled");
            params.error(err);
        }
    });
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
        data:{jsonrpc:JSON.stringify(jsonRpc)},
        success:options.success,
        error:options.error
    });
};
/**
 * sets url of rpc server
 * @param url
 */
RPC.prototype.setUrl = function(url){
    this.url = url;
};

RPC.prototype.playListAdd = function(files) {
    if (files instanceof Array) {
        this.call("Playlist.add", {
            files: files
        });
    } else {
        this.call("Playlist.add", {
            files: [files]
        });
    }
};

RPC.prototype.playListShow = function() {
    this.call("GUI.ActivateWindow", {window:"videoplaylist"});
};
RPC.prototype.playListClear = function() {
    console.log("clearing playlist");
    this.call("Playlist.Clear", {playlistid:1});
};



var rpc = new RPC();