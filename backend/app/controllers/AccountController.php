<?php

require_once 'app/models/AccountModel.php';
require_once 'app/middleware/PermissionMiddleware.php';

class AccountController
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
            $allowed = array('admin', 'manager');
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
            $allowed = array('admin', 'manager');
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
            $allowed = array('admin', 'manager');
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
            $allowed = array('admin', 'manager');
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
            $allowed = array('admin', 'manager', 'user');
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
}
