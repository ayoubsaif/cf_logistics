<?php

require_once 'app/middleware/PermissionMiddleware.php';
require_once 'app/models/AccountModel.php';

require_once 'app/models/DeliveryCarrierModel.php';
require_once 'app/modules/correos/models/CorreosModel.php';

class DeliveryCarrierController
{

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

            $deliveryCarrier = new DeliveryCarrierModel();
            $deliveryCarrier->setOne($data['deliveryCarrierId']);
            $orderData = $data;

            if ($deliveryCarrier->accountId['accountId'] != $accountId) {
                http_response_code(401);
                echo json_encode(array(
                    "message" => "Cuenta no autorizada para este transportista",
                    "accountId" => $accountId
                ));
                return;
            }
            $deliveryCarrierResponse = $deliveryCarrier->deliveryType->sendShipping($orderData);
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
}