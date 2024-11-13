<?php
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

// Datos del usuario (pueden venir de una base de datos o de un formulario)
$usuario = [
    'nombre' => 'Juan Perez',
    'email' => 'juan.perez@example.com',
    'edad' => 30,
    'ciudad' => 'Comitán'
];

// Crear instancia del PDF y generar el reporte
$pdf = new GenerarPdf();
$pdf->AddPage();
$pdf->ReporteUsuario($usuario);
$pdf->Output('D', 'reporte_usuario.pdf'); // 'D' para forzar descarga
