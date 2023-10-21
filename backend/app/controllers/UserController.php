<?php

require_once 'app/models/UserModel.php';
require_once 'app/middleware/PermissionMiddleware.php';

require_once 'app/controllers/MediaController.php';

require 'vendor/autoload.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

class UserController
{
    public function register()
    {
        try {
            $data = json_decode(file_get_contents("php://input"));

            $user = new UserModel();
            $user->firstName = $data->firstname;
            $user->lastName = $data->lastname;
            $user->email = $data->email;
            $user->password = $data->password;

            if ($user->emailExists()) {
                http_response_code(400);
                echo json_encode(array("message" => "Correo electrónico existente"));
                return;
            }

            if ($user->create()) {
                http_response_code(201);
                echo json_encode(array("message" => "Usuario creado correctamente"));
                return;
            }

            http_response_code(503);
            echo json_encode(array("message" => "No se puede crear el usuario"));
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado"));
        }
    }

    public function login()
    {
        try {
            $data = json_decode(file_get_contents("php://input"));

            $user = new UserModel();
            $user->email = $data->email;

            if (!$user->emailExists() || !$user->validatePassword($data->password)) {
                http_response_code(401);
                echo json_encode(array("message" => "Login failed"));
                return;
            }

            $this->successAuthResponse($user);
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "Unauthorized"));
        }
    }

    public function googleAuth()
    {
        try {
            $data = json_decode(file_get_contents("php://input"));
            $user = new UserModel();
            $user->email = $data->email;
            $user->firstName = $data->firstName;
            $user->lastName = $data->lastName;
            $user->image = isset($data->image) ? $data->image : null;
            $user->googleId = strval($data->googleId);
            if (!$user->emailExists()) {
                if ($user->create()) {
                    if ($user->emailExists()) {
                        http_response_code(201);
                        $this->successAuthResponse($user);
                    } else {
                        http_response_code(503);
                        echo json_encode(array("message" => "No se puede crear el usuario"));
                    }
                } else {
                    http_response_code(503);
                    echo json_encode(array("message" => "No se puede crear el usuario"));
                }
            } else {
                $user->googleIdUpdate();
                $this->successAuthResponse($user);
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado"));
        }
    }

    public function successAuthResponse($user)
    {
        $key = getenv("JWT_KEY");
        $token = array(
            "iat" => time(),
            "exp" => time() + 30 * 24 * 60 * 60,
            "data" => array(
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
            )
        );

        $jwt = JWT::encode($token, $key, "HS256");

        http_response_code(200);
        echo json_encode(array(
            "status" => "success",
            "id" => intval($user->id),
            "name" => $user->name,
            "firstName" => $user->firstName,
            "email" => $user->email,
            "image" => $user->image,
            "role" => $user->role,
            "account" => $user->account,
            "accessToken" => $jwt,
            "exp" => $token['exp'],
        ));
    }

    public function getMyProfileInfo()
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }

            $user_id = $UserPermmited->id;
            $user = new UserModel();
            $user->id = $user_id;
            $user->getOne($user_id);
            http_response_code(200);
            echo json_encode(array(
                "id" => $user->id,
                "name" => $user->name,
                "firstName" => $user->firstName,
                "lastName" => $user->lastName,
                "email" => $user->email,
                "image" => $user->image,
            ));
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "Unauthorized"));
        }
    }

    public function updateMyProfileInfo()
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }

            $user_id = $UserPermmited->id;
            $user = new UserModel();
            $user->id = $user_id;
            $user->getOne($user_id);

            $data = $_POST;
            if (empty($data)) {
                http_response_code(400);
                echo json_encode(array("message" => "No data provided"));
                return;
            }
            $updateProfileValues = [];
            if (isset($_FILES["image"])) {
                $Media = new MediaController(new MediaModel());
                if ($Media->uploadImage($_FILES["image"], 'users', $user->id, 500, 500, "update")) {
                    $user->image = $Media->fileUrl;
                    $updateProfileValues[] = "image = '{$user->image}'";
                } else {
                    http_response_code(503);
                    echo json_encode(array("message" => "Unable to upload image"));
                    return;
                }
            }

            if ($data['firstName'] !== $user->firstName) {
                $user->firstName = htmlspecialchars(strip_tags($data['firstName']));
                $updateProfileValues[] = "firstName = '{$user->firstName}'";
            }
            if ($data['lastName'] !== $user->lastName) {
                $user->lastName = htmlspecialchars(strip_tags($data['lastName']));
                $updateProfileValues[] = "lastName = '{$user->lastName}'";
            }

            if ($user->updateProfile($updateProfileValues)) {
                http_response_code(200);
                echo json_encode(array(
                    "id" => intval($user->id),
                    "name" => $user->name,
                    "firstName" => $user->firstName,
                    "lastName" => $user->lastName,
                    "email" => $user->email,
                    "image" => $user->image
                ));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to update user info"));
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "Unauthorized", "error" => $e->getMessage()));
        }
    }

    public function validateToken($token)
    {
        try {
            $key = new Key(getenv("JWT_KEY"), 'HS256');
            $decoded_token = JWT::decode($token, $key);

            // Check if the token has expired
            $current_time = time();

            if (!isset($decoded_token->exp) || $decoded_token->exp < $current_time) {
                return false;
            }

            $user_id = $decoded_token->data->id;
            $user = new UserModel();
            $user->id = $user_id;
            $user->getOne($user_id);
            return $user;
        } catch (Exception $e) {
            return $e->getMessage(); // Return the error message
        }
    }

    public function getOne($id)
    {
        $user = new UserModel();
        $user->id = $id;
        if ($user->getOne($id)) {
            http_response_code(200);
            echo json_encode(array(
                "id" => intval($user->id),
                "name" => $user->name,
                "firstName" => $user->firstName,
                "lastName" => $user->lastName,
                "email" => $user->email,
                "role" => $user->role,
                "image" => $user->image
            ));
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "User not found"));
        }
    }

    public function updateOne($id)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            $user = new UserModel();
            $user->id = $id;
            $user->getOne($id);

            $data = $_POST;
            if (empty($data)) {
                http_response_code(400);
                echo json_encode(array("message" => "No data provided"));
                return;
            }
            $updateProfileValues = [];
            if (isset($_FILES["image"])) {
                $Media = new MediaController(new MediaModel());
                if ($Media->uploadImage($_FILES["image"], 'users', $user->id, 500, 500, "update")) {
                    $user->image = $Media->fileUrl;
                    $updateProfileValues[] = "image = '{$user->image}'";
                } else {
                    http_response_code(503);
                    echo json_encode(array("message" => "Unable to upload image"));
                    return;
                }
            }

            if ($data['firstName'] !== $user->firstName) {
                $user->firstName = htmlspecialchars(strip_tags($data['firstName']));
                $updateProfileValues[] = "firstName = '{$user->firstName}'";
            }
            if ($data['lastName'] !== $user->lastName) {
                $user->lastName = htmlspecialchars(strip_tags($data['lastName']));
                $updateProfileValues[] = "lastName = '{$user->lastName}'";
            }
            if ($data['role'] !== $user->role) {
                $user->role = htmlspecialchars(strip_tags($data['role']));
                $updateProfileValues[] = "role = '{$user->role}'";
            }

            if ($user->updateProfile($updateProfileValues)) {
                http_response_code(200);
                echo json_encode(array(
                    "id" => intval($user->id),
                    "name" => $user->name,
                    "firstName" => $user->firstName,
                    "lastName" => $user->lastName,
                    "email" => $user->email,
                    "image" => $user->image
                ));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to update user info"));
            }
        } catch (Exception $e) {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to update user info", "error" => $e->getMessage()));
        }
    }

    public function deleteOne($id)
    {
        $PermissionMiddleware = new PermissionMiddleware();
        $allowed = array('admin');
        $UserPermmited = $PermissionMiddleware->handle($allowed);
        if (!$UserPermmited) {
            return;
        }
        $user = new UserModel();
        $user->id = $id;
        if ($user->deleteOne($id)) {
            http_response_code(200);
            echo json_encode(array("message" => "El usuario fue eliminado"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "No se puede eliminar el usuario"));
        }
    }

    public function getMany()
    {
        $PermissionMiddleware = new PermissionMiddleware();
        $allowed = array('admin');
        $UserPermmited = $PermissionMiddleware->handle($allowed);
        if (!$UserPermmited) {
            return;
        }

        $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
        $filter = isset($_GET['filter']) ? $_GET['filter'] : null;
        $orderBy = isset($_GET['orderBy']) ? $_GET['orderBy'] : "id";
        $order = isset($_GET['order']) ? $_GET['order'] : "asc";

        $user = new UserModel();
        $users = $user->getMany($filter, $page, $limit, $orderBy, $order);
        if ($users) {
            http_response_code(200);
            echo json_encode($users);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No users found"));
        }
    }

    public function verifyToken()
    {
        try {
            $headers = apache_request_headers();

            if (isset($headers['Authorization'])) {
                $authorizationHeader = $headers['Authorization'];

                // Comprobamos si el encabezado contiene la etiqueta 'Bearer'
                if (preg_match('/Bearer\s(\S+)/', $authorizationHeader, $matches)) {
                    $token = $matches[1];
                    if ($token) {
                        $user = new UserController();
                        $user = $user->validateToken($token);
                        if (isset($user->id)) {
                            session_start();
                            $_SESSION['user'] = intval($user->id);
                            http_response_code(200);
                            echo json_encode(array("valid" => true, "data" => array(
                                "id" => intval($user->id),
                                "name" => $user->name,
                                "firstName" => $user->firstName,
                                "lastName" => $user->lastName,
                                "email" => $user->email,
                                "image" => $user->image,
                                "role" => $user->role,
                            )
                            ));
                            return true;
                        } else {
                            http_response_code(401);
                            echo json_encode(array("message" => "Token expirado o no válido, Inicie sesión nuevamente"));
                            return false;
                        }
                    }
                } else {
                    http_response_code(401);
                    echo json_encode(array("message" => "No se ha proporcionado token"));
                    return false;
                }
            } else {
                http_response_code(401);
                echo json_encode(array("message" => "No se ha proporcionado autorización"));
                return false;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "Unauthorized", "error" => $e->getMessage()));
        }
    }

    public function getSuccessResponse()
    {
        http_response_code(200);
        echo json_encode(array("message" => "Success"));
    }
}
