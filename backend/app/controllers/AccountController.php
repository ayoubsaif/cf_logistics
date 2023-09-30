<?php

require_once 'app/models/AccountModel.php';
require_once 'app/middleware/PermissionMiddleware.php';
require_once 'app/models/OrderModel.php';

class AccountController
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
            $account = new AccountModel();
            $accountArray = $account->getAllAccounts();
            if ($accountArray) {
                http_response_code(200);
                echo json_encode($accountArray);
                return;
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Cuenta no encontrada"));
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
            $allowed = array('admin');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            $account = new AccountModel();
            $accountArray = $account->getAccountById($id);
            if ($accountArray) {
                http_response_code(200);
                echo json_encode($accountArray);
                return;
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Cuenta no encontrada"));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "Unauthorized"));
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
            $data = $_POST;
            # loop in all port array to conver it to object
            foreach ($_POST as $key => $value) {
                $data[$key] = $value;
            }
            $account = new AccountModel();
            $account->name = $data['name'];
            $account->status = $data['status'] == 'true' ? 1 : 0;
            $account->companyName = $data['companyName'];
            $account->companyLegalName = $data['companyLegalName'];
            $account->companyVat = $data['companyVat'];
            
            # check if account already exist by companyVat
            if ($account->checkIfExists($account->companyVat)) {
                http_response_code(500);
                echo json_encode(array("message" => "Cuenta con CIF {$account->companyVat} ya existe"));
                return;
            }

            $accountCreated = $account->createAccount();
            if ($accountCreated) {
                http_response_code(200);
                echo json_encode(array(
                    "message" => "Account created successfully",
                    "account" => $accountCreated
                ));
                return;
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Cuenta no creada"));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado"));
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
            $data = $_POST;
            # loop in all port array to conver it to object
            foreach ($_POST as $key => $value) {
                $data[$key] = $value;
            }
            $account = new AccountModel();
            $account->name = $data['name'];
            $account->status = $data['status'];
            $account->companyName = $data['companyName'];
            $account->companyLegalName = $data['companyLegalName'];
            $account->companyVat = $data['companyVat'];
            $account->updateAccount($id);
            http_response_code(200);
            echo json_encode(array("message" => "Cuenta actualizada con éxito"));
            return;
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado"));
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
            $account = new AccountModel();
            $account->deleteAccount($id);
            http_response_code(200);
            echo json_encode(array("message" => "Cuenta eliminada con éxito"));
            return;
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado"));
        }
    }

    function getManyByCurrentUser()
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            $account = new AccountModel();
            $accountArray = $account->getAccountsByUserId($UserPermmited->id);
            if ($accountArray) {
                http_response_code(200);
                echo json_encode($accountArray);
                return;
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Cuenta no encontrada"));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado"));
        }
    }

    function getSuccessResponse()
    {
        http_response_code(200);
        echo json_encode(array("message" => "Éxito"));
        return;
    }

    function relateUser()
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            $data = json_decode(file_get_contents('php://input'), true);
            $account = new AccountModel();
            $account->setOne($data['accountId']);
            if ($account->uuid) {
                if ($account->assignUser($data['userId']))
                {
                    http_response_code(200);
                    echo json_encode(array("message" => "Usuario relacionado con éxito"));
                    return;
                }else
                {
                    http_response_code(400);
                    echo json_encode(array("message" => "Usuario ya tiene permiso en esta cuenta"));
                    return;
                }
            }else
            {
                http_response_code(401);
                echo json_encode(array("message" => "Cuenta no encontrada"));
                return;
            }
            
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado {$e->getMessage()}"));
        }
    }

    function getStats()
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            
            $headers = apache_request_headers();
            $accountId = $headers['AccountId'];

            $orderModel = new OrderModel($accountId);
            $orderStats = $orderModel->getStats();
            if ($orderStats) {
                http_response_code(200);
                echo json_encode($orderStats);
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado"));
        }
    }

    function deleteUserRelation()
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            $data = json_decode(file_get_contents('php://input'), true);
            $account = new AccountModel();
            $account->setOne($data['accountId']);
            if ($account->uuid) {
                if ($account->deleteUserRelation($data['userId']))
                {
                    http_response_code(200);
                    echo json_encode(array("message" => "Usuario relacionado eliminado con éxito"));
                    return;
                }else
                {
                    http_response_code(400);
                    echo json_encode(array("message" => "Usuario no tiene permiso en esta cuenta"));
                    return;
                }
            }else
            {
                http_response_code(401);
                echo json_encode(array("message" => "Cuenta no encontrada"));
                return;
            }
            
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado {$e->getMessage()}"));
        }
    }
}
