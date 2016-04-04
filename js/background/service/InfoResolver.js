/**
 * Created by shaddy on 03.04.16.
 */
mainApp.service("InfoResolver", ["SettingsStorage", "$q", function(SettingsStorage, $q){
    var my = this;
    this.getFinalUrl = function(url){
        var deferred = $q.defer();
        if (!url){
            throw new Error("Cannot add empty url");
        }
        var x = new XMLHttpRequest();
        x.onreadystatechange = function(data){
            var url = data.target.responseURL;
            if (url){
                deferred.resolve(url);
            }
        };
        x.onerror = function(e){
            deferred.reject(e);
        };
        x.open('HEAD', url, true);
        x.send();
        return deferred.promise;
    };

    this.extractName = function(url){
        var chunks = url.split("/");
        return chunks[chunks.length - 1];
    };
    this.extractInfo = function(url){
        return this.getFinalUrl(url).then(function(resultUrl){
            return {
                url: resultUrl,
                name:my.extractName(resultUrl)
            }
        })
    }
}]);