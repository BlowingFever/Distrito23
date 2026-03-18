<?php
ini_set('sendmail_path', 'C:\\xampp\\sendmail\\sendmail.exe -t');

header('Content-Type: application/json');

// Solo aceptar POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(['ok' => false, 'msg' => 'Método no permitido']);
    exit;
}

// Recoger y limpiar datos
$nombre  = htmlspecialchars(trim($_POST["nombre"]  ?? ""));
$email   = filter_var(trim($_POST["email"]  ?? ""), FILTER_VALIDATE_EMAIL);
$asunto  = htmlspecialchars(trim($_POST["asunto"]  ?? ""));
$mensaje = htmlspecialchars(trim($_POST["mensaje"] ?? ""));

// Validar
if (!$nombre || !$email || !$asunto || !$mensaje) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'msg' => 'Campos inválidos']);
    exit;
}

// Preparar y enviar
$destinatario = "moisescuartero@gmail.com";
$asunto_mail  = "Distrito23 | Contacto: $asunto";
$cuerpo       = "Has recibido un nuevo mensaje desde Distrito 23.\n\n";
$cuerpo      .= "Nombre:  $nombre\n";
$cuerpo      .= "Email:   $email\n";
$cuerpo      .= "Asunto:  $asunto\n\n";
$cuerpo      .= "Mensaje:\n$mensaje";
$cabeceras    = "From: contacto@distrito23.com\r\n";
$cabeceras   .= "Reply-To: $email\r\n";
$cabeceras   .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($destinatario, $asunto_mail, $cuerpo, $cabeceras)) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'msg' => 'Error al enviar']);
}
exit;