<?php

require_once 'app/models/OrderModel.php';
require_once 'app/middleware/PermissionMiddleware.php';
require_once 'app/controllers/DeliveryCarrierController.php';

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

    function getOne($id)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }

            $order = $this->orderModel->getOne($id);

            if ($order) {
                http_response_code(200);
                echo json_encode(array(
                    "orderNumber" => $order['orderNumber'],
                    "orderDate" => $order['orderDate'],
                    "orderOrigin" => $order['orderOrigin'],
                    "orderStatus" => $order['orderStatus'],
                    "customerName" => $order['customerName'],
                    "state" => $order['state'],
                    "country" => $order['country'],
                    "postalCode" => $order['postalCode'],
                    "street" => $order['street'],
                    "streetComplement" => $order['streetComplement'],
                    "contactPhone" => $order['contactPhone'],
                    "contactMobile" => $order['contactMobile'],
                    "contactEmail" => $order['contactEmail'],
                    "shipping" => array(
                        "number" => $order['shippingNumber'],
                        "labelDatas" => $order['shippingLabelDatas'],
                        "labelFileName" => $order['shippingLabelFileName']
                    )
                ));
                return;
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Orden no encontrada"));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado {$e->getMessage()}"));
        }
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

    function getShipping($OrderId)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }

            // Get Order
            $order = $this->orderModel->getOne($OrderId);
            // Create Shipping
            $DeliveryCarrier = new DeliveryCarrierController();
            $shipping = $DeliveryCarrier->createOrderShipping($order);

            if (!$shipping) {
                http_response_code(400);
                echo json_encode(array("message" => "No se pudo confirmar la orden por error de envio"));
                return;
            }

            $orderConfirm = $this->orderModel->getShipping($OrderId, $shipping);

            if ($orderConfirm > 0) {
                $orderConfirmed = $this->orderModel->getOne($OrderId);
                http_response_code(200);
                echo json_encode($orderConfirmed);
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

    function getShippingLabel($id)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }

            $order = $this->orderModel->getOne($id);

            if ($order) {
                http_response_code(200);
                echo json_encode(array(
                    "shippingLabelDatas" => $order['shippingLabelDatas'],
                    "shippingLabelFileName" => $order['shippingLabelFileName']
                ));
                return;
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Orden no encontrada"));
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