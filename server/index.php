<?php
require_once "vendor/autoload.php";

if (!isset($_GET['url'])) {
    return;
}

$gets =  explode('/', $_GET['url']);

if ($gets[0] != 'api') {
    die();
}

header('Content-type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers:*");

if (!isset($gets[1])) {
    echo 'sem servico';
    die();
}


$service =  $gets[1];
$method = strtolower($_SERVER['REQUEST_METHOD']);
$paramet =  isset($gets[2]) ?  $gets[2] : null;

$class =  "App\Services\\" . ucfirst($service) .  "Service";



try {
    $resp_db = call_user_func([new $class, $method], $paramet);
    $response =  array(
        'status' => "success",
        'data' => $resp_db,
    );
    http_response_code(200);
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
} catch (\Exception $e) {
    http_response_code(404);
    echo json_encode(['status' => "error", 'data' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
};
