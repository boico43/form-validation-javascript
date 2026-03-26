// Seleccionamos el formulario por su ID para poder escuchar sus eventos
const form = document.getElementById("formulario");

// Escuchamos el evento submit para interceptar el envío del formulario
form.addEventListener("submit", function(event) {
    // Evitamos que el formulario se envíe automáticamente al servidor
    event.preventDefault();

    // Variable bandera: si alguna validación falla, se pone en false
    let valido = true;

    // Obtenemos referencias a cada campo del formulario
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    // Limpiamos los mensajes de error de una validación anterior
    limpiarErrores();

    // Validación 1: el nombre no puede estar vacío
    // trim() elimina espacios en blanco al inicio y al final
    if (nombre.value.trim() === "") {
        mostrarError("errorNombre", "El nombre es obligatorio", nombre);
        valido = false;
    }

    // Validación 2: el correo debe tener formato válido (algo@algo.algo)
    // Usamos una función auxiliar que aplica una expresión regular
    if (!esCorreoValido(correo.value)) {
        mostrarError("errorCorreo", "Correo no válido", correo);
        valido = false;
    }

    // Validación 3: la contraseña debe tener mínimo 8 caracteres,
    // al menos una letra y al menos un número
    if (!tieneFuerzaPassword(password.value)) {
        mostrarError("errorPassword", "Mínimo 8 caracteres, una letra y un número", password);
        valido = false;
    }

    // Validación 4: ambas contraseñas deben coincidir
    if (password.value !== confirmPassword.value) {
        mostrarError("errorConfirm", "Las contraseñas no coinciden", confirmPassword);
        valido = false;
    }

    // Si todas las validaciones pasaron, mostramos mensaje de éxito y limpiamos el formulario
    if (valido) {
        document.getElementById("mensajeExito").textContent = "Formulario enviado correctamente";
        form.reset();
    }
});

// Función reutilizable: valida que el correo tenga formato correcto
// La regex verifica que haya caracteres antes y después del @ y un dominio válido
function esCorreoValido(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

// Función reutilizable: valida que la contraseña tenga al menos 8 caracteres,
// una letra (mayúscula o minúscula) y un número
function tieneFuerzaPassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return regex.test(password);
}

// Función para mostrar un mensaje de error junto al campo correspondiente
// También agrega la clase CSS error-input para resaltar el campo en rojo
function mostrarError(id, mensaje, input) {
    document.getElementById(id).textContent = mensaje;
    input.classList.add("error-input");
}

// Función para limpiar todos los mensajes de error y estilos antes de revalidar
function limpiarErrores() {
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    document.querySelectorAll("input").forEach(input => input.classList.remove("error-input"));
}
