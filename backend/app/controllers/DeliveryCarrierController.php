<?php

require_once 'app/middleware/PermissionMiddleware.php';
require_once 'app/models/AccountModel.php';

require_once 'app/models/DeliveryCarrierModel.php';
require_once 'app/modules/correos/models/CorreosModel.php';

class DeliveryCarrierController
{
    private $deliveryCarrierModel;

    public function __construct()
    {
        # Get Account ID from headers
        $headers = apache_request_headers();
        $accountId = $headers['AccountId'];
        $this->deliveryCarrierModel = new DeliveryCarrierModel($accountId);
    }

    function sendShipping()
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'manager');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            $headers = apache_request_headers();
            $accountId = $headers['AccountId'];

            $data = json_decode(file_get_contents("php://input"), true);

            $this->deliveryCarrierModel->setOne($data['deliveryCarrierId']);
            $orderData = $data;

            $response = $this->deliveryCarrierModel->deliveryType->sendShipping($orderData);
            if ($response) {
                http_response_code(200);
                echo json_encode($response);
                return;
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Transportista no encontrado o no disponible"));
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
            $allowed = array('admin', 'manager');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            $headers = apache_request_headers();
            $accountId = $headers['AccountId'];

            $this->deliveryCarrierModel->setOne($UserPermmited['deliveryCarrierId']);
            $orderData = $order;

            if ($this->deliveryCarrierModel->accountId['accountId'] != $accountId) {
                http_response_code(401);
                echo json_encode(array(
                    "message" => "Cuenta no autorizada para este transportista",
                    "accountId" => $accountId
                ));
                return;
            }
            $deliveryCarrierResponse = $this->deliveryCarrierModel->deliveryType->sendShipping($orderData);
            if ($deliveryCarrierResponse) {
                http_response_code(200);
                echo json_encode($deliveryCarrierResponse);
                return;
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Transportista no encontrado o no disponible"));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado {$e->getMessage()}"));
        }
    }

    function getMany()
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'manager', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }

            $deliveryCarriers = $this->deliveryCarrierModel->getMany();

            if ($deliveryCarriers) {
                http_response_code(200);
                echo json_encode($deliveryCarriers);
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
}