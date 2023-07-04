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
                echo json_encode(array("message" => "Account Not found"));
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
                echo json_encode(array("message" => "Account Not found"));
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
            $account->companyVatNumber = $data['companyVatNumber'];
            $account->createAccount($account->name, $account->status, $account->companyName, $account->companyLegalName, $account->companyVatNumber);
            http_response_code(200);
            echo json_encode(array("message" => "Account created successfully"));
            return;
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
            $account->companyVatNumber = $data['companyVatNumber'];
            $account->updateAccount($id, $account->name, $account->status, $account->companyName, $account->companyLegalName, $account->companyVatNumber);
            http_response_code(200);
            echo json_encode(array("message" => "Account updated successfully"));
            return;
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
            $account = new AccountModel();
            $account->deleteAccount($id);
            http_response_code(200);
            echo json_encode(array("message" => "Account deleted successfully"));
            return;
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "Unauthorized"));
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
                echo json_encode(array("message" => "Account Not found"));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "Unauthorized"));
        }
    }

    function getSuccessResponse()
    {
        http_response_code(200);
        echo json_encode(array("message" => "Success"));
        return;
    }

}