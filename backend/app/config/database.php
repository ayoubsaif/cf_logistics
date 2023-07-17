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
            if ($acountId == null) {
                $DB_NAME = getenv('DB_NAME');
            }else{
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
                    die("Error: ".$e->getMessage());
            }
        }

    }