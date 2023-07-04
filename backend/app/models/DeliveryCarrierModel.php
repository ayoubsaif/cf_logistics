<?php

require_once 'app/models/database.php';

class DeliveryCarrierModel
{
    private $conn;

    public function __construct()
    {
        $this->conn = Connection::connectDB();
    }
    
    public function getAllDeliveryCarriers()
    {
        $query = "SELECT * FROM delivery_carriers";
        $statement = $this->conn->query($query);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getDeliveryCarrierById($id)
    {
        $query = "SELECT * FROM delivery_carriers WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function createDeliveryCarrier($name, $apiEndpoint)
    {
        $query = "INSERT INTO delivery_carriers (name, api_endpoint) VALUES (:name, :apiEndpoint)";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':name', $name);
        $statement->bindParam(':apiEndpoint', $apiEndpoint);
        return $statement->execute();
    }

    public function updateDeliveryCarrier($id, $name, $apiEndpoint)
    {
        $query = "UPDATE delivery_carriers SET name = :name, api_endpoint = :apiEndpoint WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':name', $name);
        $statement->bindParam(':apiEndpoint', $apiEndpoint);
        $statement->bindParam(':id', $id);
        return $statement->execute();
    }

    public function deleteDeliveryCarrier($id)
    {
        $query = "DELETE FROM delivery_carriers WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        return $statement->execute();
    }
}
