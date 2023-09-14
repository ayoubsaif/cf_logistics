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

    public function getMany($storeId, $status, $page = 1, $limit = 20)
    {
        $where = "WHERE storeId = {$storeId}";
        if (!empty($status)) {
            $where .= " AND orderStatus = '{$status}'";
        }

        $offset = ($page - 1) * $limit;
        $query = "SELECT * FROM orders {$where} ORDER BY id DESC LIMIT {$limit} OFFSET {$offset}";

        $statement = $this->conn->query($query);
        return array(
            "items"=>$statement->fetchAll(PDO::FETCH_ASSOC),
            "total"=>$this->getTotal($storeId, $status),
            "limit"=>$limit,
        );
    }

    public function getOne($id)
    {
        $query = "SELECT * FROM orders WHERE id = {$id}";
        $statement = $this->conn->query($query);
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function updateOne($id, $orderStatus)
    {
        $query = "UPDATE orders SET orderStatus = '{$orderStatus}' WHERE id = {$id}";
        $statement = $this->conn->query($query);
        return $statement->rowCount();
    }

    private function getTotal($storeId, $status)
    {
        $where = "WHERE storeId = {$storeId}";
        if (!empty($status)) {
            $where .= " AND orderStatus = '{$status}'";
        }

        $query = "SELECT COUNT(*) as total FROM orders {$where}";
        $statement = $this->conn->query($query);
        return $statement->fetch(PDO::FETCH_ASSOC)['total'];
    }

}
