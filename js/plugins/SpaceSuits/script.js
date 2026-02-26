// Configuración de posiciones (X, Y inferior izquierda)
const pocketData = [
    { id: "#pocket-1", x: 291, y: 480 },
    { id: "#pocket-2", x: 399, y: 480 },
    { id: "#pocket-3", x: 506, y: 480 }, // El Post-it
    { id: "#pocket-4", x: 617, y: 480 },
    { id: "#pocket-5", x: 717, y: 480 }
];

const emptySound = new Audio('https://cdn.freesound.org/previews/274/274662_2341415-lq.mp3');
const noteSound = new Audio('https://assets.codepen.io/127738/Among_Us-Task-complete.mp3');

pocketData.forEach(p => {
    const el = document.querySelector(p.id);
    gsap.set(el, { left: p.x, top: p.y - 60 });

    el.addEventListener('click', () => {
        if (el.getAttribute('data-type') === 'empty') {
            playSegment(1.2, 2); // Inicia en seg 1, termina en seg 2
            gsap.to(el, { x: 3, repeat: 3, yoyo: true, duration: 0.05 });
        } else {
            showStickyNote();
        }
    });
});

function playSegment(startTime, endTime, sound = emptySound) {
    sound.pause(); // Detener si ya estaba sonando
    sound.currentTime = startTime; // Saltar al segundo 1
    sound.play();
    
    // Calculamos la duración del fragmento (2 - 1 = 1 segundo de duración)
    const duration = (endTime - startTime) * 1000;

    setTimeout(() => {
        // Fade out rápido para evitar el "pop" sonoro del corte brusco
        gsap.to(sound, { volume: 0, duration: 0.1, onComplete: () => {
            sound.pause();
            sound.volume = 1; 
        }});
    }, duration);
}

// Función para cerrar el minijuego de forma segura
function closeGame() {
    if (window.parent && window.parent.cerrarMinijuego) {
        window.parent.cerrarMinijuego();
        window.parent.focus();
    } else {
        console.log("Función cerrarMinijuego no encontrada. (Probablemente estás fuera del motor)");
    }
}

// Evento para el botón X
document.querySelector('#close-btn').addEventListener('click', closeGame);

function showStickyNote() {
    const note = document.querySelector('#sticky-note');
    gsap.to(note, { 
        display: "flex", opacity: 1, scale: 1, rotation: 2, 
        duration: 0.6, ease: "back.out(1.7)" 
    });
    playSegment(0, 1, noteSound);

    // Activar switch de victoria
    if (window.parent && window.parent.$gameSwitches) {
        window.parent.$gameSwitches.setValue(4, true);
    }

    // OPCIONAL: Cierre automático tras 2.5 segundos de encontrar el código
    // Descomenta la siguiente línea si quieres que se cierre solo al ganar
    setTimeout(closeGame, 2500);
}

// Al cerrar el post-it manualmente, el juego sigue abierto por si el jugador quiere volver a leerlo
document.querySelector('#sticky-note').addEventListener('click', function() {
    gsap.to(this, { opacity: 0, scale: 0, duration: 0.3, display: "none" });
});