let denuncias = [];
let ubicacionActual = null;
let contadorDenuncias = 1;

// Cargar denuncias
document.addEventListener('DOMContentLoaded', () => {
    cargarDenuncias();
    cargarListaDenuncias();
});

// formulario de denuncia
document.getElementById('formDenuncia').addEventListener('submit', function(e) {
    e.preventDefault();

    // Validar campos
    const tipo = document.getElementById('tipo').value;
    const descripcion = document.getElementById('descripcion').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const evidencia = document.getElementById('evidencia').files[0];

    if (!tipo || !descripcion || !ubicacion || !evidencia) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos.',
            confirmButtonColor: '#667eea'
        });
        return;
    }

    // Crear denuncia
    const nuevaDenuncia = {
        numero: contadorDenuncias++,
        tipo: tipo,
        descripcion: descripcion,
        ubicacion: ubicacion,
        evidencia: URL.createObjectURL(evidencia),
        fecha: new Date().toLocaleString(),
        estado: 'pendiente'
    };

    // Agregar la denuncia
    denuncias.push(nuevaDenuncia);
    guardarDenuncias();

   
    document.getElementById('numeroDenuncia').textContent = nuevaDenuncia.numero;
    const modalExito = new bootstrap.Modal(document.getElementById('modalExito'));
    modalExito.show();

   
    limpiarFormulario();
    
    
    cargarListaDenuncias();
});

// Obtener ubicación
document.getElementById('btnUbicacion').addEventListener('click', obtenerUbicacion);

// imagen
document.getElementById('evidencia').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('verImagen');
            preview.src = e.target.result;
            document.getElementById('previewContainer').classList.remove('d-none');
        }
        reader.readAsDataURL(file);
    }
});


function cargarDenuncias() {
    const denunciasGuardadas = localStorage.getItem('denuncias');
    if (denunciasGuardadas) {
        denuncias = JSON.parse(denunciasGuardadas);
        contadorDenuncias = Math.max(...denuncias.map(d => d.numero), 0) + 1;
    }
}

function guardarDenuncias() {
    localStorage.setItem('denuncias', JSON.stringify(denuncias));
}

function limpiarFormulario() {
    document.getElementById('formDenuncia').reset();
    document.getElementById('previewContainer').classList.add('d-none');
    document.getElementById('verImagen').src = '';
    ubicacionActual = null;
}

function obtenerUbicacion() {
    if ("geolocation" in navigator) {
        const btnUbicacion = document.getElementById('btnUbicacion');
        btnUbicacion.disabled = true;
        btnUbicacion.textContent = 'Obteniendo...';

        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                ubicacionActual = `${lat}, ${lon}`;
                document.getElementById('ubicacion').value = ubicacionActual;
                btnUbicacion.disabled = false;
                btnUbicacion.textContent = 'Obtener Ubicación';
            },
            function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo obtener la ubicación. Por favor, inténtelo de nuevo.',
                    confirmButtonColor: '#667eea'
                });
                btnUbicacion.disabled = false;
                btnUbicacion.textContent = 'Obtener Ubicación';
            }
        );
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Su navegador no soporta geolocalización.',
            confirmButtonColor: '#667eea'
        });
    }
}

function cargarListaDenuncias() {
    const listaDenuncias = document.getElementById('listaDenuncias');
    listaDenuncias.innerHTML = '';

    if (denuncias.length === 0) {
        listaDenuncias.innerHTML = `
            <div class="text-center text-muted p-4">
                <i class="fas fa-inbox fa-3x mb-3"></i>
                <p>No hay denuncias registradas</p>
            </div>`;
        return;
    }

    denuncias.forEach(denuncia => {
        const card = document.createElement('div');
        card.className = 'denuncia-card';
        card.innerHTML = `
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h5 class="mb-1">Denuncia #${denuncia.numero}</h5>
                    <p class="mb-1"><strong>Tipo:</strong> ${denuncia.tipo}</p>
                    <p class="mb-1"><strong>Fecha:</strong> ${denuncia.fecha}</p>
                    <p class="mb-2"><strong>Estado:</strong> 
                        <span class="badge badge-${denuncia.estado}">
                            ${denuncia.estado.charAt(0).toUpperCase() + denuncia.estado.slice(1)}
                        </span>
                    </p>
                    <p class="mb-0"><small class="text-muted">Ubicación: ${denuncia.ubicacion}</small></p>
                </div>
                <img src="${denuncia.evidencia}" alt="Evidencia" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">
            </div>
        `;
        listaDenuncias.appendChild(card);
    });
}