<?php

require_once 'app/config/database.php';
require_once 'app/modules/correos/models/CorreosModel.php';
require_once 'app/models/AccountModel.php';

class DeliveryCarrierModel
{
    protected $conn;
    private $accountConn;

    public $id;
    public $name;
    public $accountId;
    public $enviroment;
    public $deliveryType;
    public $isActive;

    public function __construct($accountId)
    {
        $this->conn = Connection::connectDB($accountId);
    }
    
    private static $carrierModels = array(
        'CORREOS_ES' => CorreosModel::class,
    );

    public static function getCarrierModel($carrier, $carrierId)
    {
        if (isset(self::$carrierModels[$carrier])) {
            $modelClass = self::$carrierModels[$carrier];
            return new $modelClass($carrierId);
        }
        return null;
    }

    public function sendShipping($picking){

    }

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
        $this->deliveryType = $this->getCarrierModel($deliveryCarrier['deliveryType'], $this->id);
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
}
