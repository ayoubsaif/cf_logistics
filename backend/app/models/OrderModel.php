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

    public function getMany($storeId, $status, $filter = '', $page = 1, $limit = 20)
    {
        $where = "WHERE storeId = {$storeId}";
        if (!empty($status)) {
            $where .= " AND orderStatus = '{$status}'";
        }
        if (!empty($filter)) {
            $where .= " AND (orderNumber LIKE '%{$filter}%' OR customerName LIKE '%{$filter}%')";
        }

        $offset = ($page - 1) * $limit;
        $query = "SELECT * FROM orders {$where} ORDER BY id DESC LIMIT {$limit} OFFSET {$offset}";

        $statement = $this->conn->query($query);
        return array(
            "currentPage"=>$page,
            "totalPages"=>ceil($this->getTotal($where) / $limit),
            "items"=>$statement->fetchAll(PDO::FETCH_ASSOC),
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

    private function getTotal($where)
    {
        $query = "SELECT COUNT(*) as total FROM orders {$where}";
        $statement = $this->conn->query($query);
        return $statement->fetch(PDO::FETCH_ASSOC)['total'];
    }

    public function confirmOrder($orderId)
    {
        $query = "UPDATE orders SET orderStatus = 'confirmed' WHERE id = {$orderId}";
        $statement = $this->conn->query($query);
        return $statement->rowCount();
    }
}
