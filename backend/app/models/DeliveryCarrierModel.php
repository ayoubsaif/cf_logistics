<?php

require_once 'app/config/database.php';
require_once 'app/modules/correos/models/CorreosModel.php';
require_once 'app/models/AccountModel.php';

class DeliveryCarrierModel
{
    protected $conn;

    public $id;
    public $name;
    public $accountId;
    public $enviroment;
    public $deliveryType;
    public $carrierModel;
    public $isActive;

    public function __construct($accountId)
    {
        $this->conn = Connection::connectDB($accountId);
        $this->accountId = $accountId;
    }
    
    private static $carrierModels = array(
        'CORREOS_ES' => CorreosModel::class,
    );

    public static function getCarrierModel($carrier, $carrierId, $accountId)
    {
        if (isset(self::$carrierModels[$carrier])) {
            $modelClass = self::$carrierModels[$carrier];
            return new $modelClass($carrierId, $accountId);
        }
        return null;
    }

    public function sendShipping($order){}

    public function setOne($id)
    {
        $query = "SELECT id, name, enviroment, deliveryType, isActive FROM delivery_carriers WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        $statement->execute();
        $deliveryCarrier = $statement->fetch(PDO::FETCH_ASSOC);
        $this->id = $deliveryCarrier['id'];
        $this->name = $deliveryCarrier['name'];
        $this->enviroment = $deliveryCarrier['enviroment'];
        $this->deliveryType = $deliveryCarrier['deliveryType'];
        $this->carrierModel = $this->getCarrierModel($deliveryCarrier['deliveryType'], $this->id, $this->accountId);
        $this->isActive = $deliveryCarrier['isActive'];
    }

    public function getMany()
    {
        $query = "SELECT id, name, enviroment, deliveryType, isActive, username, password FROM delivery_carriers";
        $statement = $this->conn->prepare($query);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getOne($id)
    {
        $query = "SELECT id, name, enviroment, deliveryType, isActive, username, password, labellerCode FROM delivery_carriers WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function setActiveCarrier()
    {
        $query = "SELECT id FROM delivery_carriers WHERE isActive = 1 LIMIT 1";
        $statement = $this->conn->prepare($query);
        $statement->execute();
        $deliveryCarrier = $statement->fetch(PDO::FETCH_ASSOC);
        $this->id = $deliveryCarrier['id'];
        $this->setOne($this->id);
        if ($this->id) {
            return true;
        } else {
            return false;
        }
    }

    public function activeOne($id)
    {
        // Desactive the latest active Carrier
        $query = "UPDATE delivery_carriers SET isActive = 0 WHERE isActive = 1";
        $statement = $this->conn->prepare($query);
        $statement->execute();

        // Active Carrier
        $query = "UPDATE delivery_carriers SET isActive = 1 WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        
        if ($statement->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function updateOne($id, $data)
    {
        if ($data['isActive'] == 1) {
            $query = "UPDATE delivery_carriers SET isActive = 0 WHERE isActive = 1";
            $statement = $this->conn->prepare($query);
            $statement->execute();
        }
        $query = "UPDATE delivery_carriers SET name = :name, isActive = :isActive, enviroment = :enviroment, deliveryType = :deliveryType, username = :username, password = :password, labellerCode = :labellerCode WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        $statement->bindParam(':name', $data['name']);
        $statement->bindParam(':isActive', $data['isActive']);
        $statement->bindParam(':enviroment', $data['enviroment']);
        $statement->bindParam(':deliveryType', $data['deliveryType']);
        $statement->bindParam(':username', $data['username']);
        $statement->bindParam(':password', $data['password']);
        $statement->bindParam(':labellerCode', $data['labellerCode']);
        if ($statement->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function createOne($data)
    {
        $query = "INSERT INTO delivery_carriers (name, isActive, enviroment, deliveryType, username, password, labellerCode) VALUES (:name, :isActive, :enviroment, :deliveryType, :username, :password, :labellerCode)";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':name', $data['name']);
        $statement->bindParam(':isActive', $data['isActive']);
        $statement->bindParam(':enviroment', $data['enviroment']);
        $statement->bindParam(':deliveryType', $data['deliveryType']);
        $statement->bindParam(':username', $data['username']);
        $statement->bindParam(':password', $data['password']);
        $statement->bindParam(':labellerCode', $data['labellerCode']);
        if ($statement->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function deleteOne($id)
    {
        $query = "DELETE FROM delivery_carriers WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        if ($statement->execute()) {
            return true;
        } else {
            return false;
        }
    }

}
