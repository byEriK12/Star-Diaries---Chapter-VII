/*:
 * @target MZ
 * @plugindesc Conector para el minijuego de cables.
 * @help Usa el comando de script: SceneManager.abrirCables();
 */

SceneManager.abrirCables = function() {
    const iframe = document.createElement('iframe');
    iframe.id = 'minijuegoCables';
    iframe.src = 'js/plugins/FixWiring/index.html';
    // Estilo para que ocupe toda la pantalla
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100vw';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    iframe.style.zIndex = '1000';
    document.body.appendChild(iframe);
};

window.cerrarMinijuego = function() {
    const iframe = document.getElementById('minijuegoCables');
    if (iframe) {
        document.body.removeChild(iframe);
    }
};