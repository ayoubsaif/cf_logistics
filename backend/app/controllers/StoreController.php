<?php

require_once 'app/models/StoreModel.php';
require_once 'app/middleware/PermissionMiddleware.php';

class StoreController
{
    function getMany()
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            $store = new StoreModel();
            $storeArray = $store->getAllStores();
            if ($storeArray) {
                http_response_code(200);
                echo json_encode(array("items"=> $storeArray));
                return;
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "No se han encontrado tiendas"));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado"));
        }
    }

    function getOne($id)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            $store = new StoreModel();
            $storeArray = $store->getStoreById($id);
            if ($storeArray) {
                http_response_code(200);
                echo json_encode($storeArray);
                return;
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Tienda no encontrada"));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado"));
        }
    }

    function createOne()
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }

            $data = json_decode(file_get_contents("php://input"));
            $store = new StoreModel();
            $store->accountId = $data->accountId;
            $store->name = $data->name;
            $store->commercialName = $data->commercialName;
            $store->street = $data->street;
            $store->city = $data->city;
            $store->state = $data->state;
            $store->country = $data->country;
            $store->postalCode = $data->postalCode;
            $store->contactPhone = $data->contactPhone;
            $store->contactEmail = $data->contactEmail;
            $store->state = $data->state;

            if ($store->createStore()) {
                http_response_code(200);
                echo json_encode(array("message" => "Se creó la tienda correctamente."));
                return;
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "No se puede crear la tienda."));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado {$e->getMessage()}"));
        }
    }

    function update($id)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            $data = json_decode(file_get_contents("php://input"));
            $store = new StoreModel();
            $store->accountId = $data->accountId;
            $store->name = $data->name;
            $store->commercialName = $data->commercialName;
            $store->street = $data->street;
            $store->city = $data->city;
            $store->state = $data->state;
            $store->country = $data->country;
            $store->postalCode = $data->postalCode;
            $store->contactPhone = $data->contactPhone;
            $store->contactEmail = $data->contactEmail;
            $store->state = $data->status;

            if ($store->updateStore($id)) {
                http_response_code(200);
                echo json_encode(array("message" => "Store was updated."));
                return;
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to update store."));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "Unauthorized"));
        }
    }

    function delete($id)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            $store = new StoreModel();
            if ($store->deleteStore($id)) {
                http_response_code(200);
                echo json_encode(array("message" => "Store was deleted."));
                return;
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete store."));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "Unauthorized"));
        }
    }
}
