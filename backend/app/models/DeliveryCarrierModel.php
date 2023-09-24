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
    public $status;
    public $accountId;
    public $enviroment;
    public $deliveryType;
    public $default;

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
        $query = "SELECT * FROM delivery_carriers WHERE id = :id";
        $statement = $this->conn->prepare($query);
        $statement->bindParam(':id', $id);
        $statement->execute();
        $deliveryCarrier = $statement->fetch(PDO::FETCH_ASSOC);
        $this->id = $deliveryCarrier['id'];
        $this->name = $deliveryCarrier['name'];
        $this->status = $deliveryCarrier['status'];
        $this->accountId = (new AccountModel())->getAccountById($deliveryCarrier['accountId']);
        $this->enviroment = $deliveryCarrier['enviroment'];
        $this->deliveryType = $this->getCarrierModel($deliveryCarrier['deliveryType'], $this->id);
        $this->default = $deliveryCarrier['default'];
    }

    public function getMany()
    {
        $query = "SELECT * FROM delivery_carriers";
        $statement = $this->conn->prepare($query);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}
