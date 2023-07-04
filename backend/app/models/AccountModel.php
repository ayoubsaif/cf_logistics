<?php

require_once 'app/config/database.php';
require_once 'app/middleware/PermissionMiddleware.php';

class AccountModel
{
    private $conn;

    private $id;
    public $name;
    public $status;
    public $companyName;
    public $companyLegalName;
    public $companyVatNumber;

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

    public function createAccount($name, $status, $companyName, $companyLegalName, $companyVatNumber)
    {
        $query = "INSERT INTO accounts (name, status, companyName, companyLegalName, companyVatNumber) VALUES (:name, :status, :companyName, :companyLegalName, :companyVatNumber)";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':name', $name);
        $statement->bindParam(':status', $status);
        $statement->bindParam(':companyName', $companyName);
        $statement->bindParam(':companyLegalName', $companyLegalName);
        $statement->bindParam(':companyVatNumber', $companyVatNumber);
        return $statement->execute();
    }

    public function updateAccount($id, $name, $status, $companyName, $companyLegalName, $companyVatNumber)
    {
        $query = "UPDATE accounts SET name = :name, status = :status, companyName = :companyName, companyLegalName = :companyLegalName, companyVatNumber = :companyVatNumber WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':name', $name);
        $statement->bindParam(':status', $status);
        $statement->bindParam(':companyName', $companyName);
        $statement->bindParam(':companyLegalName', $companyLegalName);
        $statement->bindParam(':companyVatNumber', $companyVatNumber);
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
        $query = "SELECT * FROM accounts WHERE id IN (SELECT accountId FROM accountsusersrel WHERE userId = :userId)";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':userId', $userId);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}