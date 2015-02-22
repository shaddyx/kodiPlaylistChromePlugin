<?
    require_once "Config.php";
    require_once "Util.php";
    require_once "RPC.php";

    $rpcData = array_merge($_POST, $_GET);
    $queryText = print_r($rpcData, 1);
    file_put_contents("query.txt", $queryText);
    if (isset($rpcData["jsonrpc"])){
        $rpcCall = json_decode($rpcData["jsonrpc"], true);
        file_put_contents("decoded", print_r($rpcCall, 1));
        $params = $rpcCall["params"];
        file_put_contents("method", $rpcCall["method"]);
        switch($rpcCall["method"]){
            case "Playlist.add":
                $files = array();
                if (isset($params["file"])) {
                    array_push($files, $params["file"]);
                } else {
                    foreach ($params["files"] as $k=>$v) {
                        array_push($files, $v);
                    }
                }
                RPC::rpcAddFiles($files);
                break;
            default:
                print RPC::passthrough($rpcCall);
        }
    }
