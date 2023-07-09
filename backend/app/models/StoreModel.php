<?php

require_once 'app/config/database.php';
require_once 'app/middleware/PermissionMiddleware.php';

require_once 'app/models/AddressModel.php';

class StoreModel
{
    private $conn;

    private $id;
    public $storeId;
    public $accountId;
    public $name;
    public $commercialName;
    public $address;
    public $city;
    public $state;
    public $country;
    public $postalCode;
    public $status;

    public $contactName;
    public $contactEmail;
    public $contactPhone;

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

    public function createStore()
    {
        $query = "INSERT INTO stores (accountId, name, commercialName, address, city, state, country, postalCode, contactPhone, contactEmail, status) VALUES (:accountId, :name, :commercialName, :address, :city, :state, :country, :postalCode, :contactPhone, :contactEmail, :status)";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':accountId', $this->accountId);
        $statement->bindParam(':name', $this->name);
        $statement->bindParam(':commercialName', $this->commercialName);
        $statement->bindParam(':address', $this->address);
        $statement->bindParam(':city', $this->city);
        $statement->bindParam(':state', $this->state);
        $statement->bindParam(':country', $this->country);
        $statement->bindParam(':postalCode', $this->postalCode);
        $statement->bindParam(':contactPhone', $this->contactPhone);
        $statement->bindParam(':contactEmail', $this->contactEmail);
        $statement->bindParam(':status', $this->status);
        return $statement->execute();
    }

    public function updateStore($id)
    {
        $query = "UPDATE stores SET accountId = :accountId, name = :name, commercialName = :commercialName, address = :address, city = :city, state = :state, country = :country, postalCode = :postalCode, contactPhone = :contactPhone, contactEmail = :contactEmail, status = :status WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':accountId', $this->accountId);
        $statement->bindParam(':name', $this->name);
        $statement->bindParam(':commercialName', $this->commercialName);
        $statement->bindParam(':address', $this->address);
        $statement->bindParam(':city', $this->city);
        $statement->bindParam(':state', $this->state);
        $statement->bindParam(':country', $this->country);
        $statement->bindParam(':postalCode', $this->postalCode);
        $statement->bindParam(':contactPhone', $this->contactPhone);
        $statement->bindParam(':contactEmail', $this->contactEmail);
        $statement->bindParam(':status', $this->status);
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