/**
 * Created by shaddy on 18.02.15.
 */
$(function(){
    var settings = JSON.parse($.cookie("settings") || localStorage.rpcUrl || false) || {
            rpcUrl:""
        };
    rpc.setUrl(settings.rpcUrl + "/jsonrpc");
    $("#settingsButton").click(function(){
        $("#main").hide();
        $("#settings").show();
        $("#rpcUrl").val(settings.rpcUrl);
    });
    $("#saveSettingsButton").click(function() {
        settings = {
            rpcUrl: $("#rpcUrl").val()
        };
        rpc.setUrl(settings.rpcUrl);
        var settingsJson = JSON.stringify(settings);
        $.cookie("settings", settingsJson);
        localStorage.rpcUrl = settingsJson;
        $("#settings").hide();
        $("#main").show();
    });
});