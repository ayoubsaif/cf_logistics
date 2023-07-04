<?php

require_once 'app/config/database.php';
require_once 'app/middleware/PermissionMiddleware.php';

class StoreModel
{
    private $conn;

    public $storeId;
    public $accountId;
    public $name;
    public $commercialName;
    public $address;
    public $city;
    public $state;
    public $country;
    public $postalCode;
    public $phoneNumber;
    public $email;
    public $status;

    public function __construct()
    {
        $this->conn = Connection::connectDB();
    }

    public function getAllStores()
    {
        $query = "SELECT * FROM stores";
        $statement = $this->conn->query($query);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getStoreById($id)
    {
        $query = "SELECT * FROM stores WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function createStore($accountId, $name, $commercialName, $address, $city, $state, $country, $postalCode, $phoneNumber, $email, $status)
    {
        $query = "INSERT INTO stores (accountId, name, commercialName, address, city, state, country, postalCode, phoneNumber, email, status) VALUES (:accountId, :name, :commercialName, :address, :city, :state, :country, :postalCode, :phoneNumber, :email, :status)";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':accountId', $accountId);
        $statement->bindParam(':name', $name);
        $statement->bindParam(':commercialName', $commercialName);
        $statement->bindParam(':address', $address);
        $statement->bindParam(':city', $city);
        $statement->bindParam(':state', $state);
        $statement->bindParam(':country', $country);
        $statement->bindParam(':postalCode', $postalCode);
        $statement->bindParam(':phoneNumber', $phoneNumber);
        $statement->bindParam(':email', $email);
        $statement->bindParam(':status', $status);
        return $statement->execute();
    }

    public function updateStore($id, $accountId, $name, $commercialName, $address, $city, $state, $country, $postalCode, $phoneNumber, $email, $status)
    {
        $query = "UPDATE stores SET accountId = :accountId, name = :name, commercialName = :commercialName, address = :address, city = :city, state = :state, country = :country, postalCode = :postalCode, phoneNumber = :phoneNumber, email = :email, status = :status WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':accountId', $accountId);
        $statement->bindParam(':name', $name);
        $statement->bindParam(':commercialName', $commercialName);
        $statement->bindParam(':address', $address);
        $statement->bindParam(':city', $city);
        $statement->bindParam(':state', $state);
        $statement->bindParam(':country', $country);
        $statement->bindParam(':postalCode', $postalCode);
        $statement->bindParam(':phoneNumber', $phoneNumber);
        $statement->bindParam(':email', $email);
        $statement->bindParam(':status', $status);
        $statement->bindParam(':id', $id);
        return $statement->execute();
    }

    public function deleteStore($id)
    {
        $query = "DELETE FROM stores WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        return $statement->execute();
    }

    public function getStoreByAccountId($accountId)
    {
        $query = "SELECT * FROM stores WHERE accountId = :accountId";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':accountId', $accountId);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }
    
}