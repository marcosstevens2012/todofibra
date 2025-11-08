<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(strip_tags(trim($_POST['name'])));
    $email = htmlspecialchars(strip_tags(trim($_POST['email'])));
    $subject = htmlspecialchars(strip_tags(trim($_POST['subject'])));
    $message = htmlspecialchars(strip_tags(trim($_POST['message'])));
    
    // Validar los datos
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Email inválido.']);
        exit;
    }

    
    $to = 'todofibrapiscinas@gmail.com'; 
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Mensaje enviado con éxito.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al enviar el mensaje.']);
    }
}
?>
