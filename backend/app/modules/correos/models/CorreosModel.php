<?php

require_once 'app/config/database.php';
require_once 'app/models/DeliveryCarrierModel.php';
require_once 'app/models/StoreModel.php';

const ERROR_CODES = array(
    '65' => 'El envío ya está dado de alta',
    '66' => 'El envío ya está dado de baja',
    '67' => 'El envío no está pre-registrado',
    '68' => 'El código de estádo del envío no es correcto',
    '198' => 'Cliente y contrato no pertenecen al usuario que solicita la operación.',
    '284' => 'Error en la validación de su certificado de acceso.'
);

class CorreosModel extends DeliveryCarrierModel
{
    protected $correos_username;
    protected $correos_password;
    protected $correos_labeller_code;

    public function __construct($id, $accountId)
    {
        parent::__construct($accountId);
        $this->setOne($id);
        $this->deliveryType = 'CORREOS_ES';
    }

    public function sendShipping($orderData)
    {
        if ($this->deliveryType === 'CORREOS_ES') {
            return $this->correos_send_shipping($orderData);
        } else {
            // Handle unsupported deliveryType or call parent method
            return parent::sendShipping($orderData);
        }
    }

    public function correos_send_shipping($orderData) {
        $package_info = $this->_correos_prepare_create_shipping($orderData);
        
        try
        {
            $response = $this->correos_send($package_info);
            $xml = new SimpleXMLElement($response);
            $ns = $xml->getNamespaces(true);
            $soapenv = $xml->children($ns['soapenv']);
            $response = $soapenv->Body->children()->RespuestaPreregistroEnvio;
        }
        catch (Exception $e)
        {
            throw new Exception('Correos error: ' . $e->getMessage());
        }

        $xml->registerXPathNamespace('ns', 'http://schemas.xmlsoap.org/soap/envelope/');
        $root = $xml->xpath('//ns:Envelope/ns:Body')[0];

        $errors = $root->xpath('.//faultstring|//DescError');
        if (!empty($errors)) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = (string) $error;
            }
            throw new Exception('Correos error: ' . implode(', ', $errorMessages));
        }
        $carrierTrackingRef = (string) $response->Bulto->CodEnvio;
        $attachmentData = (string) $response->Bulto->Etiqueta->Etiqueta_pdf->Fichero;
        $attachmentName = (string) $response->Bulto->Etiqueta->Etiqueta_pdf->NombreF;
        return array(
            'tracking_number' => $carrierTrackingRef,
            'tracking_url' => 'https://www.correos.es/es/es/herramientas/localizador/envios/detalle?tracking-number=' . $carrierTrackingRef,
            'file' => array(
                'name' => $attachmentName,
                'datas' => $attachmentData
            )
        );
    }
    
    public function _correos_prepare_create_shipping($orderData)
    {
            $phone = $orderData['contactPhone'] ?? $orderData['contactMobile'] ?? '000';
            $pickingDate = date('d-m-Y H:i:s');
            $partnerAddress = implode(' ', array_filter([$orderData['street'], $orderData['streetComplement']]));
            
            $Store = new StoreModel();
            $Store->setOne($orderData['storeId']);

            if ($Store->storeId === null) {
                echo 'Store not found: '.$orderData['storeId'];
                return false;
            }

            $Account = new AccountModel();
            $Account->setOne($Store->accountId);

            if ($Account->uuid === null) {
                echo "Account not found: ".$Store->accountId;
                return false;
            }

            $xml = <<<XML
                <soapenv:Envelope
                    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                    xmlns="http://www.correos.es/iris6/services/preregistroetiquetas">
                    <soapenv:Header/>
                    <soapenv:Body>
                        <PreregistroEnvio>
                            <FechaOperacion>{$pickingDate}</FechaOperacion>
                            <CodEtiquetador>{$this->correos_labeller_code}</CodEtiquetador>
                            <Care>000000</Care>
                            <ModDevEtiqueta>2</ModDevEtiqueta>
                            <Remitente>
                                <Identificacion>
                                    <Nombre>{$Store->name}</Nombre>
                                    <Nif>{$Account->companyVat}</Nif>
                                </Identificacion>
                                <DatosDireccion>
                                    <Direccion>{$Store->street}</Direccion>
                                    <Numero>{$Store->streetComplement}</Numero>
                                    <Localidad>{$Store->city}</Localidad>
                                    <Provincia>{$Store->state}</Provincia>
                                </DatosDireccion>
                                <CP>{$Store->postalCode}</CP>
                                <Telefonocontacto>{$Store->contactPhone}</Telefonocontacto>
                                <Email>{$Store->contactEmail}</Email>
                            </Remitente>
                            <Destinatario>
                                <Identificacion>
                                    <Nombre>{$orderData['customerName']}</Nombre>
                                </Identificacion>
                                <DatosDireccion>
                                    <Direccion>{$partnerAddress}</Direccion>
                                    <Localidad>{$orderData['city']}</Localidad>
                                </DatosDireccion>
                                <CP>{$orderData['postalCode']}</CP>
                                <Telefonocontacto>{$phone}</Telefonocontacto>
                                <Email>{$orderData['contactEmail']}</Email>
                            </Destinatario>
                            <Envio>
                                <CodProducto>S0132</CodProducto>
                                <ReferenciaCliente>{$orderData['orderNumber']}</ReferenciaCliente>
                                <Observaciones1>{$orderData['orderNumber']}</Observaciones1>
                                <TipoFranqueo>FP</TipoFranqueo>
                                <ModalidadEntrega>ST</ModalidadEntrega>
                                <Pesos>
                                <Peso>
                                    <TipoPeso>R</TipoPeso>
                                    <Valor>1000</Valor>
                                </Peso>
                                </Pesos>
                                <Largo>100</Largo>
                                <Alto>10</Alto>
                                <Ancho>10</Ancho>
                            </Envio>
                        </PreregistroEnvio>
                    </soapenv:Body>
                </soapenv:Envelope>
        XML;
        
        return $this->correos_normalize_text($xml);
    }

    public function correos_normalize_text($text) {
        $text = str_replace('&', '&amp;', $text);
        return $text ? preg_replace('/[^(\x20-\x7F)]*/', '', $text) : null;
    }    

    public function correos_send($data) {
        if ($this->enviroment === 'production') {
            $url = 'https://preregistroenvios.correos.es/preregistroenvios';
            $credentials = $this->correos_username . ':' . $this->correos_password;
        } else {
            $url = 'https://preregistroenviospre.correos.es/preregistroenvios';
            $credentials = $this->correos_username . ':' . $this->correos_password;
        }
        
        $credentials = base64_encode($credentials);
        $headers = [
            'Content-type: text/xml;charset=utf-8',
            'Content-Length: ' . strlen($data),
            'Authorization: Basic ' . $credentials,
            'SOAPAction: PreRegistro',
        ];
        
        $options = [
            CURLOPT_URL => $url,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_RETURNTRANSFER => true,
        ];
        
        $curl = curl_init();
        curl_setopt_array($curl, $options);
        $response = curl_exec($curl);
        curl_close($curl);
        
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
        $this->isActive = $deliveryCarrier['isActive'];
        $this->enviroment = $deliveryCarrier['enviroment'];
        $this->correos_username = $deliveryCarrier['username'];
        $this->correos_password = $deliveryCarrier['password'];
        $this->correos_labeller_code = $deliveryCarrier['labellerCode'];
    }
    
}
