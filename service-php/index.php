<?php
header('Access-Control-Allow-Origin: *');
// Permitir métodos HTTP específicos
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Permitir encabezados personalizados
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Importamos librería para generar el pdf
require('fpdf186/fpdf.php');

class GenerarPdf extends FPDF
{
    function Header()
    {
        // Fuente y título
        $this->SetFont('Arial', 'B', 14);
        $this->Cell(0, 10, 'Reporte de Usuario', 0, 1, 'C');
        $this->Ln(10);
    }

    // Pie de página del reporte
    function Footer()
    {
        $this->SetY(-15); // Posición a 15 mm del final
        $this->SetFont('Arial', 'I', 8);
        $this->Cell(0, 10, 'Pagina ' . $this->PageNo(), 0, 0, 'C');
    }

    // Cuerpo del reporte
    function ReporteUsuario($usuario)
    {
        $this->SetFont('Arial', '', 12);
        foreach ($usuario as $clave => $valor) {
            $this->Cell(40, 10, ucfirst($clave) . ':', 0, 0);
            $this->Cell(100, 10, $valor, 0, 1);
        }
    }
}


// Obtener los datos enviados desde Angular (deben enviarse como JSON)
$data = json_decode(file_get_contents('php://input'), true);

// Comprobamos si nos llega la información
if ($data) {
    $timestamp = strtotime($data['created_at']);
    $formatDate = date("d/m/Y H:i:s", $timestamp);
    $usuario = [
        'Nombre' => $data['name'] . ' ' . $data['surname'],
        'Email' => $data['email'],
        'Fecha de creacion' => $formatDate
    ];

    // Crear instancia del PDF y generar el reporte
    $pdf = new GenerarPdf();
    $pdf->AddPage();
    $pdf->ReporteUsuario($usuario);

    // Configuración de la respuesta HTTP para descargar el archivo
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="reporte_usuario.pdf"');
    $pdf->Output();
}
