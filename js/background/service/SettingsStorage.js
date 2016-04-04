/**
 * Created by shaddy on 03.04.16.
 */
mainApp.service("SettingsStorage", [function(){
    var settings = {};
    var load = function(){
        settings = JSON.parse(window.localStorage.settings || "{}");
    };
    var save = function(){
        window.localStorage.settings = JSON.stringify(settings);
    };
    load();
    /**
     * returns url
     * @returns {string}
     */
    this.getURL = function(){
        return settings.url;
    };
    this.setUrl = function(urlToSet){
        settings.url = urlToSet
        save();
    };
}]);