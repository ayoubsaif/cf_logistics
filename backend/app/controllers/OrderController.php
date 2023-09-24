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
        if (!isset($headers['AccountId'])) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado"));
            return;
        }
        $accountId = $headers['AccountId'];
        $this->orderModel = new OrderModel($accountId);
    }

    function getMany($storeId)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
    
            $status = $_GET['status'] ?? null;
            $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
            $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
            $filter = isset($_GET['filter']) ? $_GET['filter'] : null;
    
            $orders = $this->orderModel->getMany($storeId, $status, $filter, $page, $limit);
    
            if ($orders) {
                http_response_code(200);
                echo json_encode($orders);
                return;
            } else {
                http_response_code(200);
                echo json_encode(array("items" => []));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado {$e->getMessage()}"));
        }
    }

    function confirmOrder($OrderId)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }

            // Get Order
            $order = $this->orderModel->setOne($OrderId);
            // Create Shipping
            $shipping = $this->createShipping($order);

            $orderConfirm = $this->orderModel->confirmOrder($order['id'], $shipping);

            if ($orderConfirm) {
                http_response_code(200);
                echo json_encode(array("message" => "Pedido confirmado"));
                return;
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "No se pudo confirmar la orden"));
                return;
            }

        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado {$e->getMessage()}"));
        }
    }

    function createShipping($order)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }

            $DeliveryCarrier = new DeliveryCarrierController();
            $shipping = $DeliveryCarrier->createOrderShipping($order);

            if ($shipping) {
                return $shipping;
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "No se pudo crear el envio"));
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