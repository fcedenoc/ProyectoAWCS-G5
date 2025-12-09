<?php

ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio Sesión</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body {
            background: linear-gradient(#00559C 0%, #4FA3D1 40%, #E6EEF2 100%);
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Segoe UI', sans-serif;
        }

        .login-card {
            width: 100%;
            max-width: 650px;
            background: white;
            border-radius: 20px;
            box-shadow: 0px 4px 20px rgba(0,0,0,0.2);
            padding: 50px;
            text-align: center;
        }

        .btn-login {
            background: #00559C;
            color: #ffffff;
            border-radius: 10px;
            padding: 10px;
            width: 100%;
            transition: 0.3s;
            border: none;
            font-size: 1.1rem;
        }

        .btn-login:hover {
            background: #003f73;
        }

        .enlaces a {
            text-decoration: none;
            color: #00559C;
            font-size: 0.9rem;
        }

        .enlaces a:hover {
            text-decoration: underline;
        }

        .form-control {
            background-color: white;
            color: black;
        }
    </style>
</head>

<body>

    <div class="login-card">
        <h3>Iniciar Sesión</h3>

        <form id="loginForm">

            <div class="mb-3 text-start">
                <label for="usuario" class="form-label">Usuario</label>
                <input type="text" class="form-control" id="usuario">
            </div>

            <div class="mb-3 text-start">
                <label for="contrasenna" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="contrasenna">
            </div>

            <button type="submit" class="btn-login">Ingresar</button>

            <div class="enlaces mt-3">
                <p><a href="recuperacontra.html">¿Olvidaste tu contraseña?</a></p>
                <p><a href="registro.html">Crear cuenta nueva</a></p>
            </div>

        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script>
        document.getElementById("loginForm").addEventListener("submit", function(e) {
            e.preventDefault();

            const usuario = document.getElementById("usuario").value.trim();
            const contrasenna = document.getElementById("contrasenna").value.trim();

            if (usuario.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Datos faltantes',
                    text: 'Debe ingresar un usuario.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
                return;
            }

            if (contrasenna.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Datos faltantes',
                    text: 'Debe ingresar la contraseña.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
                return;
            }

            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión correcto',
                text: 'Redirigiendo...',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });

            setTimeout(() => {
                window.location.href = "../index.html";
            }, 2000);
        });
    </script>

</body>
</html>
