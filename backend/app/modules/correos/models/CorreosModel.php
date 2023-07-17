<?php

require_once 'app/models/DeliveryCarrierModel.php';

const ERROR_CODES = array(
    '65' => 'El envío ya está dado de alta',
    '66' => 'El envío ya está dado de baja',
    '67' => 'El envío no está pre-registrado',
    '68' => 'El código de estádo del envío no es correcto',
    '198' => 'Cliente y contrato no pertenecen al usuario que solicita la operación.',
    '284' => 'Error en la validación de su certificado de acceso.'
);

const CORREOS_URLS = array(
    'test' => 'https://preregistroenviospre.correos.es/preregistroenvios',
    'production' => 'https://preregistroenvios.correos.es/preregistroenvios'
);

class CorreosModel extends DeliveryCarrierModel
{
    protected $correos_username;
    protected $correos_password;
    protected $correos_labeller_code;

    public function __construct()
    {
        $this->deliveryType = 'correos';
    }

    public function sendShipping($picking)
    {
        if ($this->deliveryType === 'correos') {
            return $this->correos_send_shipping($picking);
        } else {
            // Handle unsupported deliveryType or call parent method
            return parent::sendShipping($picking);
        }
    }

    public function correos_send_shipping($pickings)
    {
        $soapOptions = [
            'soap_version' => 'SOAP_1_1',
            'trace' => true, // Enable request/response tracing
            'exceptions' => true, // Enable exceptions on SOAP errors
            'connection_timeout' => 120, // Timeout in seconds
        ];
    
        $soapEndpoint = $this->enviroment == 'prod' ? CORREOS_URLS['prod'] : CORREOS_URLS['test'];
    
        $credentials = $this->correos_username . ':' . $this->correos_password;
        $credentials = base64_encode($credentials);
    
        $data = $this->mountXmlObject()->asXML();

        $headers = [
            'Content-type: text/xml;charset=utf-8',
            'Content-Length: ' . strlen($data),
            'Authorization: Basic ' . $credentials,
            'SOAPAction: ' . 'PreregistroEnvioMultibulto',
        ];
    
        $soapClient = new SoapClient($soapEndpoint, $soapOptions);
    
        $soapClient->__setSoapHeaders(new SoapHeader('http://www.correos.es/iris6/services/preregistroetiquetas', 'HeaderName', $headers));
    
        $response = $soapClient->__doRequest($data, $soapEndpoint, 'PreregistroEnvioMultibulto', 'SOAP_1_1');
        var_dump($soapClient);

        return $response;
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
        $this->deliveryType = $this->getCarrierModel($deliveryCarrier['deliveryType']);
        $this->correos_username = $deliveryCarrier['correos_username'];
        $this->correos_password = $deliveryCarrier['correos_password'];
        $this->correos_labeller_code = $deliveryCarrier['correos_labeller_code'];
    }
    
    private function mountXmlObject()
    {
        $xmlObject = new SimpleXMLElement('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cor="http://www.correos.es/comun/wsb_correos_preregistro"> </soapenv:Envelope>');
    
        $body = $xmlObject->addChild('soapenv:Body');
        $preregistroEnvioMultibulto = $body->addChild('PreregistroEnvioMultibulto', '', 'cor');
    
        $preregistroEnvioMultibulto->addChild('FechaOperacion', date('Y-m-d'), 'cor');
        $preregistroEnvioMultibulto->addChild('CodEtiquetador', $this->correos_labeller_code, 'cor');
        $preregistroEnvioMultibulto->addChild('Care', '000000', 'cor');
        $preregistroEnvioMultibulto->addChild('TotalBultos', '1', 'cor');
        $preregistroEnvioMultibulto->addChild('ModDevEtiqueta', '2', 'cor');
        $preregistroEnvioMultibulto->addChild('NotificacionBulto', 'N', 'cor');
    
        $remitente = $preregistroEnvioMultibulto->addChild('Remitente', '', 'cor');
        $identificacionRemitente = $remitente->addChild('Identificacion', '', 'cor');
        $identificacionRemitente->addChild('Nombre', 'Nombre', 'cor');
        $identificacionRemitente->addChild('Nif', 'Nif', 'cor');
        $identificacionRemitente->addChild('Empresa', 'Empresa', 'cor');
    
        $datosDireccionRemitente = $remitente->addChild('DatosDireccion', '', 'cor');
        $datosDireccionRemitente->addChild('Direccion', 'Direccion', 'cor');
        $datosDireccionRemitente->addChild('Localidad', 'Localidad', 'cor');
        $datosDireccionRemitente->addChild('Provincia', 'Provincia', 'cor');
    
        $remitente->addChild('CP', 'CP', 'cor');
        $remitente->addChild('Telefonocontacto', 'Telefonocontacto', 'cor');
        $remitente->addChild('Emailcontacto', 'Emailcontacto', 'cor');
    
        $destinatario = $preregistroEnvioMultibulto->addChild('Destinatario', '', 'cor');
        $identificacionDestinatario = $destinatario->addChild('Identificacion', '', 'cor');
        $identificacionDestinatario->addChild('Nombre', 'Nombre', 'cor');
        $identificacionDestinatario->addChild('Nif', 'Nif', 'cor');
        $identificacionDestinatario->addChild('Empresa', 'Empresa', 'cor');
    
        $datosDireccionDestinatario = $destinatario->addChild('DatosDireccion', '', 'cor');
        $datosDireccionDestinatario->addChild('Direccion', 'Direccion', 'cor');
        $datosDireccionDestinatario->addChild('Localidad', 'Localidad', 'cor');
        $datosDireccionDestinatario->addChild('Provincia', 'Provincia', 'cor');
    
        $destinatario->addChild('CP', 'CP', 'cor');
        $destinatario->addChild('Telefonocontacto', 'Telefonocontacto', 'cor');
        $destinatario->addChild('Emailcontacto', 'Email', 'cor');
    
        $envio = $preregistroEnvioMultibulto->addChild('Envio', '', 'cor');
        $envio->addChild('NumBulto', '1', 'cor');
        $envio->addChild('ReferenciaCliente', 'ReferenciaCliente', 'cor');
        $envio->addChild('Largo', 'Largo', 'cor');
        $envio->addChild('Alto', 'Alto', 'cor');
        $envio->addChild('Ancho', 'Ancho', 'cor');
        $envio->addChild('Observaciones1', 'Observaciones1', 'cor');
        $envio->addChild('Observaciones2', 'Observaciones2', 'cor');
        $envio->addChild('TipoModificacion', '1', 'cor');
        $envio->addChild('PersonaContacto', '', 'cor');
        $envio->addChild('Email', '', 'cor');
        $envio->addChild('NumeroSMS', '', 'cor');
    
        $preregistroEnvioMultibulto->addChild('PesoTotal', 'PesoTotal', 'cor');
        $preregistroEnvioMultibulto->addChild('CodProducto', 'CodProducto', 'cor');
        $preregistroEnvioMultibulto->addChild('TipoFranqueo', 'FP', 'cor');
        $preregistroEnvioMultibulto->addChild('ModalidadEntrega', 'ST', 'cor');
    
        return $xmlObject;
    }
    
}
