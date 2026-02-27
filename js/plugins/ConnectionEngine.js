SceneManager.abrirEngranajes = function() {
    this._iframe = document.createElement('iframe');
    this._iframe.id = 'engineIframe';
    this._iframe.src = 'js/plugins/Engine/index.html'; 
    this._iframe.style.position = 'fixed'; 
    this._iframe.style.top = '0';
    this._iframe.style.left = '0';
    this._iframe.style.width = '100vw';
    this._iframe.style.height = '100vh';
    this._iframe.style.border = 'none';
    this._iframe.style.zIndex = '1000';
    document.body.appendChild(this._iframe);
};

// Esta es la función que llama el script.js
window.cerrarMinijuego = function() {
    const iframe = document.getElementById('engineIframe');
    if (iframe) {
        document.body.removeChild(iframe);
        // Al cerrar, el control vuelve a RPG Maker
    }
};