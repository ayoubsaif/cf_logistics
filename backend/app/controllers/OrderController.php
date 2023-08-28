<?php

require_once 'app/models/OrderModel.php';
require_once 'app/middleware/PermissionMiddleware.php';

class OrderController
{
    private $orderModel;

    public function __construct()
    {
        # Get Account ID from headers
        $headers = apache_request_headers();
        $accountId = $headers['AccountId'];
        $this->orderModel = new OrderModel($accountId);
    }

    function getMany($storeId)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'manager');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            $status = $_GET['status'] ?? null;
            $orderArray = $this->orderModel->getMany($storeId, $status);
            if ($orderArray) {
                http_response_code(200);
                echo json_encode(array("data" => $orderArray));
                return;
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "No se han encontrado pedidos"));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado {$e->getMessage()}"));
        }
    }

    function getSuccessResponse()
    {
        http_response_code(200);
        echo json_encode(array("message" => "ok"));
        return;
    }
}