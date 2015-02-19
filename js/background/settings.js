/**
 * Created by shaddy on 18.02.15.
 */
var settings = JSON.parse($.cookie("settings") || false) || {
        rpcUrl:""
    };
$(function(){
    $("#settingsButton").click(function(){
        $("#main").hide();
        $("#settings").show();
        $("#rpcUrl").val(settings.rpcUrl);
    });
    $("#saveSettingsButton").click(function() {
        settings = {
            rpcUrl: $("#rpcUrl").val()
        }
        $.cookie("settings", JSON.stringify(settings));
        $("#settings").hide();
        $("#main").show();
    });
});