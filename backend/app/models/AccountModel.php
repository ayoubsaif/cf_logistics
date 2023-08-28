<?php

require_once 'app/config/database.php';
require_once 'app/middleware/PermissionMiddleware.php';

class AccountModel
{
    private $conn;

    private $id;
    public $uuid;
    public $name;
    public $status;
    public $companyName;
    public $companyLegalName;
    public $companyVat;

    public function __construct()
    {
        $this->conn = Connection::connectDB();
    }

    public function getAllAccounts()
    {
        $query = "SELECT * FROM accounts";
        $statement = $this->conn->query($query);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAccountById($id)
    {
        $query = "SELECT * FROM accounts WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function createAccount()
    {
        if(!$this->createAccountDB()){
            return false;
        }

        $query = "INSERT INTO accounts (accountId, name, status, companyName, companyLegalName, companyVat) 
                    VALUES (:uuid, :name, :status, :companyName, :companyLegalName, :companyVat)";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':uuid', $this->uuid);
        $statement->bindParam(':name', $this->name);
        $statement->bindParam(':status', $this->status);
        $statement->bindParam(':companyName', $this->companyName);
        $statement->bindParam(':companyLegalName', $this->companyLegalName);
        $statement->bindParam(':companyVat', $this->companyVat);
        // return data of the account created
        if ($statement->execute()) {
            $query = "SELECT * FROM accounts WHERE id = {$this->conn->lastInsertId()}";
            $statement = $this->conn->prepare($query);
            $statement->execute();
            $accountCreated = $statement->fetch(PDO::FETCH_ASSOC);
            return $accountCreated;
        }else{
            return false;
        }
    }

    public function updateAccount($id)
    {
        $query = "UPDATE accounts SET name = :name, status = :status, companyName = :companyName, companyLegalName = :companyLegalName, companyVat = :companyVat WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':name', $this->name);
        $statement->bindParam(':status', $this->status);
        $statement->bindParam(':companyName', $this->companyName);
        $statement->bindParam(':companyLegalName', $this->companyLegalName);
        $statement->bindParam(':companyVat', $this->companyVat);
        $statement->bindParam(':id', $id);
        return $statement->execute();
    }

    public function deleteAccount($id)
    {
        $query = "DELETE FROM accounts WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        return $statement->execute();
    }

    public function getAccountsByUserId($userId)
    {
        $query = "SELECT * FROM accounts WHERE id IN (SELECT accountId FROM accounts_users_rel WHERE userId = :userId)";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':userId', $userId);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function checkIfExists($companyVat)
    {
        $query = "SELECT 1 FROM accounts WHERE companyVat = :companyVat LIMIT 1";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':companyVat', $companyVat);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    private function createAccountDB()
    {
        $this->uuid = uniqid();
        $query = "SELECT 1 FROM information_schema.schemata WHERE schema_name = :schemaName LIMIT 1";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':schemaName', $this->uuid);
        $statement->execute();
        if($statement->fetch(PDO::FETCH_ASSOC)){
            return false;
        }
        # create database
        try{
            $db_name = (getenv('DB_PREFIX') ? getenv('DB_PREFIX') : 'cfl_') . $this->uuid;
            echo $db_name;
            $query = "CREATE DATABASE {$db_name}";
            $statement = $this->conn->prepare($query);
            if ($statement->execute()) {
                return true;
            }
            return false;
        }catch(Exception $e){
            return true;
        }
    }

    public function setOne($id)
    {
        $query = "SELECT * FROM accounts WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        $statement->execute();
        $account = $statement->fetch(PDO::FETCH_ASSOC);
        $this->id = $account['id'];
        $this->uuid = $account['accountId'];
        $this->name = $account['name'];
        $this->status = $account['status'];
        $this->companyName = $account['companyName'];
        $this->companyLegalName = $account['companyLegalName'];
        $this->companyVat = $account['companyVat'];
    }

    public function assignUser($userId)
    {
        if ($this->checkIfUserExists($userId)) {
            return false;
        }
        $query = "INSERT INTO accounts_users_rel (accountId, userId) VALUES (:accountId, :userId)";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':accountId', $this->id);
        $statement->bindParam(':userId', $userId);
        return $statement->execute();
    }

    public function checkIfUserExists($userId)
    {
        $query = "SELECT 1 FROM accounts_users_rel WHERE accountId = :accountId AND userId = :userId LIMIT 1";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':accountId', $this->id);
        $statement->bindParam(':userId', $userId);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function deleteUserRelation($userId)
    {
        $query = "DELETE FROM accounts_users_rel WHERE accountId = :accountId AND userId = :userId";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':accountId', $this->id);
        $statement->bindParam(':userId', $userId);
        return $statement->execute();
    }
    
}