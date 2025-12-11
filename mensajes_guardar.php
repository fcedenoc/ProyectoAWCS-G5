<?php

// Configuración de la base de datos
$servername = "localhost";
$username = "root"; 
$password = "Jordan18122579";      
$database = "BD_PF_III25";

// Conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificación de conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Recibir datos del formulario
$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$mensaje = $_POST['mensaje'];

// Preparar inserción segura
$stmt = $conn->prepare("INSERT INTO mensajes (nombre, correo, mensaje) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nombre, $correo, $mensaje);

if ($stmt->execute()) {
    echo "<script>
            alert('Mensaje enviado correctamente.');
            window.location.href = 'index.html';
          </script>";
} else {
    echo "<script>
            alert('Error al enviar mensaje.');
            window.location.href = 'index.html';
          </script>";
}

$stmt->close();
$conn->close();
?>
