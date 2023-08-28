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

    public function getMany($storeId, $status)
    {
        $where = "WHERE storeId = {$storeId}";
        if (!empty($status)) {
            $where = $where . " AND orderStatus = '{$status}'";
        }
        $query = "SELECT * FROM orders {$where}";
        $statement = $this->conn->query($query);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getManyOpen($storeId)
    {
        $query = "SELECT * FROM orders WHERE storeId = {$storeId} AND orderStatus = 'open'";
        $statement = $this->conn->query($query);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}