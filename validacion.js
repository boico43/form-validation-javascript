// Obtener el formulario
const form = document.getElementById("formulario");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita envío si hay errores

    let valido = true;

    // Campos
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    // Limpiar errores
    limpiarErrores();

    // Validar nombre
    if (nombre.value.trim() === "") {
        mostrarError("errorNombre", "El nombre es obligatorio", nombre);
        valido = false;
    }

    // Validar correo
    if (!esCorreoValido(correo.value)) {
        mostrarError("errorCorreo", "Correo no válido", correo);
        valido = false;
    }

    // Validar contraseña
    if (!tieneFuerzaPassword(password.value)) {
        mostrarError("errorPassword", "Mínimo 8 caracteres, una letra y un número", password);
        valido = false;
    }

    // Confirmar contraseña
    if (password.value !== confirmPassword.value) {
        mostrarError("errorConfirm", "Las contraseñas no coinciden", confirmPassword);
        valido = false;
    }

    // Si todo está bien
    if (valido) {
        document.getElementById("mensajeExito").textContent = "Formulario enviado correctamente";
        form.reset();
    }
});

// Función para validar correo
function esCorreoValido(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

// Función para validar contraseña fuerte
function tieneFuerzaPassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return regex.test(password);
}

// Mostrar errores
function mostrarError(id, mensaje, input) {
    document.getElementById(id).textContent = mensaje;
    input.classList.add("error-input");
}

// Limpiar errores
function limpiarErrores() {
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    document.querySelectorAll("input").forEach(input => input.classList.remove("error-input"));
}|
