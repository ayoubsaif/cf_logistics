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
        $accountId = $headers['Accountid'];
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

            $this->deliveryCarrierModel->setOne($UserPermmited['deliveryCarrierId']);
            $orderData = $order;

            $deliveryCarrierResponse = $this->deliveryCarrierModel->carrierModel->sendShipping($orderData);
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


    public function createOrderShipping($order)
    {
        try {
            $headers = apache_request_headers();
            $accountId = $headers['Accountid'];

            if (!$order)
            {
                http_response_code(400);
                echo json_encode(array(
                    "message" => "No se ha encontrado el pedido",
                    "accountId" => $accountId
                ));
                return;
            }

            if (!$this->deliveryCarrierModel->setActiveCarrier())
            {
                http_response_code(400);
                echo json_encode(array(
                    "message" => "No hay transportista activo, revisa la configuración de transportistas",
                    "accountId" => $accountId
                ));
                return;
            }

            $deliveryCarrierResponse = $this->deliveryCarrierModel->carrierModel->sendShipping($order);
            if ($deliveryCarrierResponse) {
                return $deliveryCarrierResponse;
            } else {
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

    // Active Carrier and desable the latest active Carrier"""
    function activeCarrier($carrierId)
    {
        try {
            $CarrierExists = $this->deliveryCarrierModel->getOne($carrierId);

            if (!$CarrierExists) {
                http_response_code(400);
                echo json_encode(array(
                    "message" => "Transportista inexistente",
                    "deliveryCarrierId" => $carrierId
                ));
                return;
            }

            $deliveryCarrier = $this->deliveryCarrierModel->activeOne($carrierId);

            if ($deliveryCarrier) {
                http_response_code(200);
                echo json_encode(array("message" => "Transportista Activado correctamente"));
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

    function getOne($id)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'manager', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }

            $deliveryCarrier = $this->deliveryCarrierModel->getOne($id);

            if ($deliveryCarrier) {
                http_response_code(200);
                echo json_encode($deliveryCarrier);
                return;
            } else {
                http_response_code(400);
                echo json_encode(array(
                    "message" => "Transportista inexistente",
                    "deliveryCarrierId" => $id
                ));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado {$e->getMessage()}"));
        }
    }
    
    function updateOne($id){
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'manager', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }

            $data = json_decode(file_get_contents("php://input"), true);

            $deliveryCarrier = $this->deliveryCarrierModel->updateOne($id, $data);

            if ($deliveryCarrier) {
                http_response_code(200);
                echo json_encode(array(
                    "message" => "Transportista actualizado correctamente",
                    "deliveryCarrierId" => $id
                ));
                return;
            } else {
                http_response_code(400);
                echo json_encode(array(
                    "message" => "Transportista inexistente",
                    "deliveryCarrierId" => $id
                ));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado {$e->getMessage()}"));
        }        
    }

    function createOne()
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'manager');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }

            $data = json_decode(file_get_contents("php://input"), true);

            $deliveryCarrier = $this->deliveryCarrierModel->createOne($data);

            if ($deliveryCarrier) {
                http_response_code(200);
                echo json_encode(array(
                    "message" => "Transportista creado correctamente",
                    "deliveryCarrierId" => $deliveryCarrier
                ));
                return;
            } else {
                http_response_code(400);
                echo json_encode(array(
                    "message" => "Error al crear el transportista",
                    "deliveryCarrierId" => $deliveryCarrier
                ));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado {$e->getMessage()}"));
        }        
    }

    function deleteOne($id)
    {   
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'manager');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }

            $deliveryCarrier = $this->deliveryCarrierModel->deleteOne($id);

            if ($deliveryCarrier) {
                http_response_code(200);
                echo json_encode(array(
                    "message" => "Transportista eliminado correctamente",
                    "deliveryCarrierId" => $id
                ));
                return;
            } else {
                http_response_code(400);
                echo json_encode(array(
                    "message" => "Error al eliminar el transportista",
                    "deliveryCarrierId" => $id
                ));
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
        echo json_encode(array("message" => "Success"));
    }
}