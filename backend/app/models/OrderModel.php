<?php
    
require_once 'app/config/database.php';

class OrderModel
{
    protected $conn;

    public $id;
    public $orderNumber;
    public $orderDate;
    public $orderStatus;
    public $customerName;
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

    public function __construct($accountId)
    {
        $this->conn = Connection::connectDB($accountId);
    }

    public function getMany()
    {
        $query = "SELECT * FROM orders";
        $statement = $this->conn->query($query);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}