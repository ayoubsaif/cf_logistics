<?php

require_once 'app/models/OrderModel.php';
require_once 'app/middleware/PermissionMiddleware.php';
require_once 'app/controllers/DeliveryCarrierController.php';

require 'vendor/autoload.php';
use setasign\Fpdi\Tcpdf\Fpdi;

class OrderController
{
    private $orderModel;

    public function __construct()
    {
        # Get Account ID from headers
        $headers = apache_request_headers();
        if (!isset($headers['Accountid'])) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado"));
            return;
        }
        $accountId = $headers['Accountid'];
        $this->orderModel = new OrderModel($accountId);
    }

    function getOne($id)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }

            $order = $this->orderModel->getOne($id);

            if ($order) {
                http_response_code(200);
                echo json_encode(array(
                    "orderNumber" => $order['orderNumber'],
                    "orderDate" => $order['orderDate'],
                    "orderOrigin" => $order['orderOrigin'],
                    "orderStatus" => $order['orderStatus'],
                    "customerName" => $order['customerName'],
                    "state" => $order['state'],
                    "country" => $order['country'],
                    "postalCode" => $order['postalCode'],
                    "street" => $order['street'],
                    "streetComplement" => $order['streetComplement'],
                    "contactPhone" => $order['contactPhone'],
                    "contactMobile" => $order['contactMobile'],
                    "contactEmail" => $order['contactEmail'],
                    "shipping" => array(
                        "number" => $order['shippingNumber'],
                        "labelDatas" => $order['shippingLabelDatas'],
                        "labelFileName" => $order['shippingLabelFileName']
                    )
                ));
                return;
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Orden no encontrada"));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado {$e->getMessage()}"));
        }
    }

    function getMany($storeId)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
    
            $status = $_GET['status'] ?? null;
            $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
            $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
            $filter = isset($_GET['filter']) ? $_GET['filter'] : null;
    
            $orders = $this->orderModel->getMany($storeId, $status, $filter, $page, $limit);
    
            if ($orders) {
                http_response_code(200);
                echo json_encode($orders);
                return;
            } else {
                http_response_code(200);
                echo json_encode(array("items" => []));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado {$e->getMessage()}"));
        }
    }

    function getOpenOrders($storeId)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }
            
            if (empty($storeId)) {
                http_response_code(400);
                echo json_encode(array("message" => "No se ha enviado el ID de la tienda"));
                return;
            }

            $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
            $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
            $filter = isset($_GET['filter']) ? $_GET['filter'] : null;
    
            $orders = $this->orderModel->getManyOpen($storeId, $filter, $page, $limit);
    
            if ($orders) {
                http_response_code(200);
                echo json_encode($orders);
                return;
            } else {
                http_response_code(200);
                echo json_encode(array("items" => []));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado {$e->getMessage()}"));
        }
    }

    function getShipping($OrderId)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }

            // Get Order
            $order = $this->orderModel->getOne($OrderId);
            // Create Shipping
            $DeliveryCarrier = new DeliveryCarrierController();
            $shipping = $DeliveryCarrier->createOrderShipping($order);

            if (!$shipping) {
                http_response_code(400);
                echo json_encode(array("message" => "No se pudo confirmar la orden por error de envio"));
                return;
            }

            $orderConfirm = $this->orderModel->getShipping($OrderId, $shipping);

            if ($orderConfirm > 0) {
                $orderConfirmed = $this->orderModel->getOne($OrderId);
                http_response_code(200);
                echo json_encode($orderConfirmed);
                return;
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "No se pudo confirmar la orden"));
                return;
            }

        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado {$e->getMessage()}"));
        }
    }

    function getShippingLabel($id)
    {
        try {
            $PermissionMiddleware = new PermissionMiddleware();
            $allowed = array('admin', 'client');
            $UserPermmited = $PermissionMiddleware->handle($allowed);
            if (!$UserPermmited) {
                return;
            }

            $labelFormat = $_GET['format'] ?? null;

            if (empty($labelFormat)) {
                http_response_code(400);
                echo json_encode(array("message" => "No se ha enviado el formato de la etiqueta"));
                return;
            }

            $order = $this->orderModel->getOne($id);

            if ($order && $labelFormat) {
                if ($labelFormat == 'A4') {
                    if (empty($order["shippingLabelDatas"])) {
                        http_response_code(200);
                        echo json_encode(array("message" => "No se ha encontrado la etiqueta de envio"));
                        return;
                    }

                    // Create a new TCPDF instance for the A4 page without margins and header / footer borders
                    $pdf = new Fpdi('P', 'mm', 'A4', true, 'UTF-8', false);

                    // Add a page to the A4 PDF
                    $pdf->AddPage();

                    // Base64-encoded shipping label PDF (replace with your actual base64-encoded label PDF)
                    $base64LabelPDF = $order["shippingLabelDatas"]; // Replace with your base64-encoded label PDF content

                    // Decode the base64-encoded label PDF
                    $decodedLabelPDF = base64_decode($base64LabelPDF);

                    // Create a temporary file to store the decoded label PDF
                    $tempLabelFile = tempnam(sys_get_temp_dir(), 'shipping_label');
                    file_put_contents($tempLabelFile, $decodedLabelPDF);

                    // Import the label PDF into the A4 page
                    $pageCount = $pdf->setSourceFile($tempLabelFile);
                    if ($pageCount === 0) {
                        die('Imported PDF has no pages.');
                    }
                    $tplIdx = $pdf->importPage(1);

                    // Get the dimensions of the imported label PDF
                    $importedWidth = 150;
                    $importedHeight = 100;

                    // Calculate the position to center the imported PDF horizontally
                    $centerX = (210 - $importedWidth) / 2; // A4 width is 210 mm

                    // Use the imported label PDF as a template, centered horizontally
                    $pdf->useTemplate($tplIdx, $centerX, 20);

                    //desable first header line 
                    $pdf->SetPrintHeader(false);

                    // Add a dotted border around the imported PDF
                    $pdf->SetLineStyle(array('width' => 0.5, 'color' => array(156, 156, 156), 'dash' => '5,3'));
                    $pdf->Rect($centerX - 5, 18, $importedWidth + 5, $importedHeight + 5);

                    $pdf->SetFont('helvetica', 'B', 12);
                    
                    $pdf->Cell(0, 0, "Imprima este papel en un folio A4 y recorte la etiqueta de envio", 0, 0, 'L');
                    $pdf->Ln(5);
                    $pdf->Cell(160, 35, strtoupper($order["orderOrigin"]), 0, 0, 'R');

                    // Add watermark text with delivery by CrasForum Logistics and rotate -45 degrees
                    $pdf->SetFont('helvetica', '', 6);
                    $pdf->SetTextColor(0, 0, 0);
                    $pdf->Rotate(90, 100, 100);
                    $pdf->Text(82, 31, 'Delivery Technology by');
                    $pdf->SetFont('helvetica', 'B', 7);
                    $pdf->Text(82, 34, 'CrasForum Logistics');

                    // Output the resulting PDF
                    $pdf->Output($order["shippingLabelFileName"], 'I');

                    // Clean up the temporary label file
                    unlink($tempLabelFile);
                }
                if ($labelFormat == "100x150") {
                    // Create a new TCPDF instance for shipping label format 100x150 without margins and header / footer borders
                    $pdf = new Fpdi('P', 'mm', array(100, 150), true, 'UTF-8', false);

                    // Add a page to the 100x150 PDF
                    $pdf->AddPage();

                    // Base64-encoded shipping label PDF (replace with your actual base64-encoded label PDF)
                    $base64LabelPDF = $order["shippingLabelDatas"]; // Replace with your base64-encoded label PDF content

                    // Decode the base64-encoded label PDF
                    $decodedLabelPDF = base64_decode($base64LabelPDF);

                    // Create a temporary file to store the decoded label PDF
                    $tempLabelFile = tempnam(sys_get_temp_dir(), 'shipping_label');

                    file_put_contents($tempLabelFile, $decodedLabelPDF);

                    // Import the label PDF into the 100x150 page
                    $pageCount = $pdf->setSourceFile($tempLabelFile);

                    if ($pageCount === 0) {
                        die('Imported PDF has no pages.');
                    }

                    $tplIdx = $pdf->importPage(1);

                    // Get the dimensions of the imported label PDF
                    $importedWidth = 150;
                    $importedHeight = 100;

                    // Calculate the position to center the imported PDF horizontally
                    $centerX = (100 - $importedWidth) / 2; // A4 width is 210 mm

                    // Use the imported label PDF as a template, centered horizontally
                    $pdf->useTemplate($tplIdx, $centerX, 0);

                    //desable first header line
                    $pdf->SetPrintHeader(false);

                    // Add a dotted border around the imported PDF
                    $pdf->SetLineStyle(array('width' => 0.5, 'color' => array(156, 156, 156), 'dash' => '5,3'));

                    $pdf->Rect($centerX - 5, 0, $importedWidth + 5, $importedHeight + 5);

                    // Add watermark text with delivery by CrasForum Logistics and rotate -45 degrees
                    $pdf->SetFont('helvetica', '', 6);
                    $pdf->SetTextColor(0, 0, 0);
                    $pdf->Rotate(90, 50, 50);
                    $pdf->Text(22, 31, 'Delivery Technology by');
                    $pdf->SetFont('helvetica', 'B', 7);
                    $pdf->Text(22, 34, 'CrasForum Logistics');

                    // Output the resulting PDF
                    $pdf->Output($order["shippingLabelFileName"], 'I');

                    // Clean up the temporary label file
                    unlink($tempLabelFile);
                }
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Orden no encontrada"));
                return;
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(array("message" => "No autorizado {$e->getMessage()}"));
        }
    }

    function getSuccessResponse()
    {
        http_response_code(200);
        echo json_encode(array("message" => "ok"));
        return;
    }
}