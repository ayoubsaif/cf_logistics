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
    public $street;
    public $streetComplement;
    public $city;
    public $state;
    public $country;
    public $postalCode;

    public $contactName;
    public $contactEmail;
    public $contactPhone;

    public function __construct($accountId = null)
    {
        $this->conn = Connection::connectDB();
        $this->accountId = $accountId;
    }

    public function getAllStores()
    {
        $query = "SELECT * FROM stores";
        $statement = $this->conn->query($query);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getMany()
    {
        $query = "SELECT stores.* FROM stores INNER JOIN accounts ON accounts.id = stores.accountId WHERE accounts.accountId = :accountId";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':accountId', $this->accountId);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getStoreById($id)
    {
        $query = "SELECT * FROM stores WHERE storeId = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function createStore()
    {
        $query = "INSERT INTO stores (accountId, storeId, name, commercialName, street, streetComplement, city, state, country, postalCode, contactPhone, contactEmail, status) 
                             VALUES (:accountId, uuid(), :name, :commercialName, :street, :city, :state, :country, :postalCode, :contactPhone, :contactEmail, :status)";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':accountId', $this->accountId);
        $statement->bindParam(':name', $this->name);
        $statement->bindParam(':commercialName', $this->commercialName);
        $statement->bindParam(':street', $this->street);
        $statement->bindParam(':streetComplement', $this->streetComplement);
        $statement->bindParam(':city', $this->city);
        $statement->bindParam(':state', $this->state);
        $statement->bindParam(':country', $this->country);
        $statement->bindParam(':postalCode', $this->postalCode);
        $statement->bindParam(':contactPhone', $this->contactPhone);
        $statement->bindParam(':contactEmail', $this->contactEmail);
        echo $statement->queryString;
        return $statement->execute();
    }

    public function updateStore($id)
    {
        $query = "UPDATE stores SET accountId = :accountId, name = :name, commercialName = :commercialName, street = :street, streetComplement = :streetComplement, city = :city, state = :state, country = :country, postalCode = :postalCode, contactPhone = :contactPhone, contactEmail = :contactEmail, status = :status WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':accountId', $this->accountId);
        $statement->bindParam(':name', $this->name);
        $statement->bindParam(':commercialName', $this->commercialName);
        $statement->bindParam(':street', $this->street);
        $statement->bindParam(':streetComplement', $this->streetComplement);
        $statement->bindParam(':city', $this->city);
        $statement->bindParam(':state', $this->state);
        $statement->bindParam(':country', $this->country);
        $statement->bindParam(':postalCode', $this->postalCode);
        $statement->bindParam(':contactPhone', $this->contactPhone);
        $statement->bindParam(':contactEmail', $this->contactEmail);
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
    
    public function setOne($id)
    {
        $query = "SELECT * FROM stores WHERE storeId = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        $statement->execute();
        $store = $statement->fetch(PDO::FETCH_ASSOC);
        $this->id = $store['id'];
        $this->storeId = $store['storeId'];
        $this->accountId = $store['accountId'];
        $this->name = $store['name'];
        $this->commercialName = $store['commercialName'];
        $this->street = $store['street'];
        $this->streetComplement = $store['streetComplement'];
        $this->city = $store['city'];
        $this->state = $store['state'];
        $this->country = $store['country'];
        $this->postalCode = $store['postalCode'];
        $this->contactName = $store['contactName'];
        $this->contactEmail = $store['contactEmail'];
        $this->contactPhone = $store['contactPhone'];
    }
}