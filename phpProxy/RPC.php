<?php
/**
 * Created by PhpStorm.
 * User: shaddy
 * Date: 21.02.15
 * Time: 14:01
 */

class RPC {
    /**
     * @param $req
     */
    public static function request($req) {
        file_put_contents("req.txt", $req. "\n", FILE_APPEND);
        if (Config::$enableRequest){
            return file_get_contents($req);
        } else {
            print $req;
        }
    }

    public static function rpcShowPlayList(){
        $request["jsonrpc"] = "2.0";
        $request["id"] = "1";
        $request["method"] = "GUI.ActivateWindow";
        $request["params"]["window"] = "videoplaylist";
        self::request("http://" . Config::$rpcHost . "/jsonrpc?request=" . json_encode($request));
    }
    public static function passthrough($query){
       return self::request("http://" . Config::$rpcHost . "/jsonrpc?request=" . json_encode($query));
    }


    /**
     * @param $file
     */
    public static function rpcAddFile($file){
        file_put_contents("files.txt", print_r($file, 1). "\n", FILE_APPEND);
        if ($file["useCaptionFromLocation"] || $file["useUrlFromLocation"]){
            list ($url, $capt) = Util::getUrlredirrectLocation($file["url"]);
            if ($file["useUrlFromLocation"]){
                $file["url"] = $url;
            }
            if ($file["useCaptionFromLocation"]) {
                $file["caption"] = $capt;
            }
        }
        if ($file["redirrect"]) {
            $finalUrl = "http://" . Config::$proxyUrl . "/mv/" . urlencode(str_replace("/", "ẹ", $file["url"])) . "/" . $file["caption"];
        } else {
            $finalUrl = urlencode($file["url"]);
        }

        $request["jsonrpc"] = "2.0";
        $request["id"] = "1";
        $request["method"] = "Playlist.Add";
        $request["params"]["playlistid"] = 1;
        $request["params"]["item"]["file"] = $finalUrl;
        self::request("http://" . Config::$rpcHost . "/jsonrpc?request=" . json_encode($request));
    }

    public static function rpcAddFiles($files){
        foreach($files as $k => $v){
            self::rpcAddFile($v);
        }
        self::rpcShowPlayList();
    }

}