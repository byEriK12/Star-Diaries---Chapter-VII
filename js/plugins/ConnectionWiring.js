/*:
 * @target MZ
 * @plugindesc Conector para el minijuego de cables - VERSIÓN FORZADA
 */

SceneManager.abrirCables = function() {
    // Eliminar si ya existe uno previo para evitar duplicados
    const old = document.getElementById('minijuegoCables');
    if (old) document.body.removeChild(old);

    const iframe = document.createElement('iframe');
    iframe.id = 'minijuegoCables';
    iframe.src = 'js/plugins/FixWiring/index.html';
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100vw';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    iframe.style.zIndex = '10000'; // Aseguramos que esté por encima de todo
    document.body.appendChild(iframe);
};

// Función global de emergencia
window.cerrarMinijuego = function() {
    const iframe = document.getElementById('minijuegoCables');
    if (iframe) {
        iframe.remove(); // Método más moderno para eliminar
        window.focus();
    }
};