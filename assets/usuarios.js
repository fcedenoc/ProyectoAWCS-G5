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
            timer: 5000,
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
            timer: 5000,
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
        timer: 3000,
        timerProgressBar: true
    });

    setTimeout(() => {
        window.location.href = "dashboard.html"; 
    }, 3000);
});