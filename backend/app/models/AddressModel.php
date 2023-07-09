<?php

require_once 'app/config/database.php';
require_once 'app/middleware/PermissionMiddleware.php';

class AddressModel
{
    private $conn;

    private $id;
    public $addressName;
    public $contactName;
    public $companyName;
    public $vat;
    public $street;
    public $streetComplement;
    public $postalCode;
    public $city;
    public $state;
    public $country;
    public $contactPhone;
    public $contactMobile;
    public $contactEmail;
    public $accountId;

    public function __construct()
    {
        $this->conn = Connection::connectDB();
    }

    public function getMany()
    {
        $query = "SELECT * FROM addresses";
        $statement = $this->conn->query($query);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getOne($id)
    {
        $query = "SELECT * FROM addresses WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function createOne()
    {
        $query = "INSERT INTO addresses (addressName, contactName, companyName, docId, street, streetComplement, postalCode, city, state, country, contactPhone, contactMobile, contactEmail, accountId) VALUES (:addressName, :contactName, :companyName, :docId, :street, :streetComplement, :postalCode, :city, :state, :country, :contactPhone, :contactMobile, :contactEmail, :accountId)";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':addressName', $this->addressName);
        $statement->bindParam(':contactName', $this->contactName);
        $statement->bindParam(':companyName', $this->companyName);
        $statement->bindParam(':docId', $this->vat);
        $statement->bindParam(':street', $this->street);
        $statement->bindParam(':streetComplement', $this->streetComplement);
        $statement->bindParam(':postalCode', $this->postalCode);
        $statement->bindParam(':city', $this->city);
        $statement->bindParam(':state', $this->state);
        $statement->bindParam(':country', $this->country);
        $statement->bindParam(':contactPhone', $this->contactPhone);
        $statement->bindParam(':contactMobile', $this->contactMobile);
        $statement->bindParam(':contactEmail', $this->contactEmail);
        $statement->bindParam(':accountId', $this->accountId);
        return $statement->execute();
    }

    public function deleteOne($id)
    {
        $query = "DELETE FROM addresses WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        return $statement->execute();
    }

}