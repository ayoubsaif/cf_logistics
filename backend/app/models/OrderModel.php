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
    public $shippingNumber;
    public $shippingLabelDatas;
    public $shippingLabelFileName;

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
        $query = "SELECT id, orderNumber, orderDate, orderOrigin, orderStatus, customerName, state, country, postalCode
                    FROM orders {$where} ORDER BY id DESC LIMIT {$limit} OFFSET {$offset}";

        $statement = $this->conn->query($query);
        # get all orders from database with custom array
        $items = $statement->fetchAll(PDO::FETCH_ASSOC);

        return array(
            "currentPage"=>$page,
            "totalPages"=>ceil($this->getTotal($where) / $limit),
            "items"=>$items
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

    public function getShipping($orderId, $shipment)
    {
        // Update state to done, and add shipment number, and base64 label into shippmentLabel
        $query = "UPDATE orders
            SET orderStatus = 'picking',
                shippingNumber = '{$shipment['tracking_number']}',
                shippingLabelDatas = '{$shipment['file']['datas']}',
                shippingLabelFileName = '{$shipment['file']['name']}'
            WHERE id = {$orderId}";
        // return confirmed order data
        $statement = $this->conn->query($query);
        return $statement->rowCount();
    }

    public function confirmOrder($orderId)
    {
        // Update state to done, and add shipment number, and base64 label into shippmentLabel
        $query = "UPDATE orders SET orderStatus = 'done' WHERE id = {$orderId}";
        // return confirmed order data
        $statement = $this->conn->query($query);
        return $statement->rowCount();
    }

    public function setOne($OrderId)
    {
        $query = "SELECT * FROM orders WHERE id = {$OrderId}";
        $statement = $this->conn->query($query);
        $order = $statement->fetch(PDO::FETCH_ASSOC);

        $this->id = $order['id'];
        $this->orderNumber = $order['orderNumber'];
        $this->orderDate = $order['orderDate'];
        $this->orderStatus = $order['orderStatus'];
        $this->customerName = $order['customerName'];
        $this->companyName = $order['companyName'];
        $this->vat = $order['vat'];
        $this->street = $order['street'];
        $this->streetComplement = $order['streetComplement'];
        $this->postalCode = $order['postalCode'];
        $this->city = $order['city'];
        $this->state = $order['state'];
        $this->country = $order['country'];
        $this->contactPhone = $order['contactPhone'];
        $this->contactMobile = $order['contactMobile'];
        $this->contactEmail = $order['contactEmail'];
    }

    public function getStats()
    {
        $query = "SELECT orderStatus, COUNT(*) as total FROM orders GROUP BY orderStatus";
        $statement = $this->conn->query($query);
        echo json_encode($statement->fetchAll(PDO::FETCH_ASSOC));
        if ($statement->rowCount() > 0) {
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }
        return array();
    }
}
