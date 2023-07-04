<?php

require_once 'app/models/StoreModel.php';
require_once 'app/middleware/PermissionMiddleware.php';

class StoreController
{
    function getMany()
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'manager');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            $store = new StoreModel();
            $storeArray = $store->getAllStores();
            if ($storeArray) {
                http_response_code(200);
                echo json_encode($storeArray);
                return;
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Store Not found"));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "Unauthorized"));
        }
    }

    function getOne($id)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'manager');
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
                echo json_encode(array("message" => "Store Not found"));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "Unauthorized"));
        }
    }

    function create()
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'manager');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            $data = json_decode(file_get_contents("php://input"));
            $store = new StoreModel();
            $store->accountId = $data->accountId;
            $store->name = $data->name;
            $store->commercialName = $data->commercialName;
            $store->address = $data->address;
            $store->city = $data->city;
            $store->state = $data->state;
            $store->country = $data->country;
            $store->postalCode = $data->postalCode;
            $store->phoneNumber = $data->phoneNumber;
            $store->email = $data->email;
            $store->status = $data->status;

            if ($store->createStore($store->accountId, $store->name, $store->commercialName, $store->address, $store->city, $store->state, $store->country, $store->postalCode, $store->phoneNumber, $store->email, $store->status)) {
                http_response_code(200);
                echo json_encode(array("message" => "Store was created."));
                return;
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create store."));
                return;
            }

        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "Unauthorized"));
        }
    }

    function update($id)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'manager');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            $data = json_decode(file_get_contents("php://input"));
            $store = new StoreModel();
            $store->accountId = $data->accountId;
            $store->name = $data->name;
            $store->commercialName = $data->commercialName;
            $store->address = $data->address;
            $store->city = $data->city;
            $store->state = $data->state;
            $store->country = $data->country;
            $store->postalCode = $data->postalCode;
            $store->phoneNumber = $data->phoneNumber;
            $store->email = $data->email;
            $store->status = $data->status;

            if ($store->updateStore($id, $store->accountId, $store->name, $store->commercialName, $store->address, $store->city, $store->state, $store->country, $store->postalCode, $store->phoneNumber, $store->email, $store->status)) {
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
            $allowed = array('admin', 'manager');
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