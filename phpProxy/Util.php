<?php
/**
 * Created by PhpStorm.
 * User: shaddy
 * Date: 21.02.15
 * Time: 14:01
 */

class Util {
    public static function getUrlredirrectLocation($url){
        file_get_contents($url, false, null, 0, 1);
        foreach ($http_response_header as $node) {
            if (substr($node, 0, 9) == "Location:") {
                $url = str_replace("Location: ", "", $node);
                $parts = explode("/", $node);
                $capt = $parts[max(array_keys($parts))];
                break;
            }
        }
        return [$url, $capt];
    }
}