const lugares = {
    chilis: 'Chilis',
    beso: 'Beso Frances',
    conamu: 'Conamu',
    napoleon: 'Cafeteria Napoleon'
};

const btnNo = document.getElementById('btnNo');
if (btnNo) {
    let contador = 0;
    const mensajes = ['acepta porfa', 'no sigas presionando el boton', 'daleee amor', 'aceptaaa porfa'];
    btnNo.addEventListener('click', function(e) {
        e.preventDefault();
        if (contador < mensajes.length) {
            btnNo.textContent = mensajes[contador];
            contador++;
        } else {
            window.location.href = '../Inicio.html';
        }
    });
}

const btnElige = document.getElementById('btnElige');
if (btnElige) {
    btnElige.addEventListener('click', function() {
        const keys = Object.keys(lugares);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const lugar = lugares[randomKey];
        const fechaInput = document.getElementById('fecha');
        const fecha = fechaInput.value ? formatearFecha(fechaInput.value) : '04/11/2026';
        guardarCita(lugar, fecha);
        alert('\u{2764}\u{FE0F} \u{00A1}Tu cita ser\u00E1 en ' + lugar + ' el d\u00EDa ' + fecha + '! \u{2764}\u{FE0F}');
    });
}

const btnEscoger = document.getElementById('btnEscoger');
const modalOverlay = document.getElementById('modalOverlay');
const btnCambiar = document.getElementById('btnCambiar');
const btnConfirmar = document.getElementById('btnConfirmar');
const btnCerrarModal = document.getElementById('btnCerrarModal');

if (btnEscoger && modalOverlay) {
    btnEscoger.addEventListener('click', function() {
        modalOverlay.style.display = 'flex';
    });
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    });
}

if (btnCerrarModal) {
    btnCerrarModal.addEventListener('click', function() {
        modalOverlay.style.display = 'none';
    });
}

if (btnCambiar) {
    btnCambiar.addEventListener('click', function() {
        const formDate = document.querySelector('.form-date');
        if (formDate) {
            formDate.style.display = formDate.style.display === 'none' || formDate.style.display === '' ? 'block' : 'none';
        }
    });
}

if (btnConfirmar) {
    btnConfirmar.addEventListener('click', function() {
        const selected = document.querySelector('input[name="lugar"]:checked');
        if (!selected) {
            alert('\u{00A1}Por favor selecciona un lugar para nuestra cita! \u{2764}\u{FE0F}');
            return;
        }
        const lugar = lugares[selected.value];
        const fechaInput = document.getElementById('fecha');
        const fecha = fechaInput.value ? formatearFecha(fechaInput.value) : '04/11/2026';
        guardarCita(lugar, fecha);
        alert('\u{2764}\u{FE0F} \u{00A1}Nuestra cita sera\u00E1 en ' + lugar + ' el d\u00EDa ' + fecha + '! \u{2764}\u{FE0F}');
        modalOverlay.style.display = 'none';
    });
}

function formatearFecha(fechaStr) {
    const partes = fechaStr.split('-');
    if (partes.length === 3) {
        return partes[2] + '/' + partes[1] + '/' + partes[0];
    }
    return fechaStr;
}

const fechaInput = document.getElementById('fecha');
if (fechaInput && !fechaInput.value) {
    fechaInput.value = '2026-11-04';
}

function guardarCita(lugar, fecha) {
    fetch('/api/guardar-cita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lugar, fecha })
    }).catch(function() {});
}
