<?php

    class Connection {

        static private function authDB() {

            $authDB = array(
                "host" => getenv('DB_HOST'),
                "database" => getenv('DB_NAME'),
                "username" => getenv('DB_USER'),
                "password" => getenv('DB_PASS'),
            );

            return $authDB;

        }

        static public function connectDB($acountId = null){
            $DB_NAME = getenv('DB_NAME');
            if ($acountId){
                $DB_NAME = getenv('DB_PREFIX') . $acountId;
            }

            try{
                $authDB = self::authDB();
                $connection = new PDO(
                    "mysql:host=".$authDB["host"].";dbname=".$DB_NAME, 
                    $authDB["username"], 
                    $authDB["password"]);
                $connection -> exec("set names utf8");
                return $connection;
            }
            catch(PDOException $e){
                http_response_code(401);
                echo json_encode(array("message" => "Cuenta no autorizada {$e}"));
                die();
            }
        }

    }