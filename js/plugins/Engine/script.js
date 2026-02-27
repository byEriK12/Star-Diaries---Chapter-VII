let gearsInstalled = 0;

function setupGear(gearId, axleId, rotationSpeed, direction, x, y) {
    const gear = document.querySelector(gearId);
    const axle = document.querySelector(axleId);
    const guide = axle.parentElement;

    // Posicionar guía
    gsap.set(guide, { left: x, top: y });

    Draggable.create(gear, {
        onRelease: function() {
            if (this.hitTest(axle, "40%")) {
                this.disable();
                gearsInstalled++;
                
                gsap.to(this.target, {
                    left: x, top: y,
                    x: 0, y: 0,
                    xPercent: -50, yPercent: -50,
                    duration: 0.3,
                    onComplete: () => {
                        gsap.to(this.target, {
                            rotation: 360 * direction,
                            duration: rotationSpeed,
                            repeat: -1,
                            ease: "none"
                        });
                        checkVictory();
                    }
                });
            } else {
                gsap.to(this.target, { x: 0, y: 0, duration: 0.5, ease: "back.out" });
            }
        }
    });

        // Lógica para el engranaje que sobra (No tiene eje asociado)
        Draggable.create("#gear-5", {
            onRelease: function() {
                // Al no encontrar eje, vuelve a su posición original
                gsap.to(this.target, { 
                    x: 0, 
                    y: 0, 
                    duration: 0.5, 
                    ease: "back.out" 
                });
            }
        });
}

function checkVictory() {
    if (gearsInstalled === 4) {
        new Audio('https://assets.codepen.io/127738/Among_Us-Task-complete.mp3').play();
        
        // Devolvemos el foco al juego principal inmediatamente
        if (window.parent) window.parent.focus(); 

        // Cerramos la ventana después de un segundo y medio
        setTimeout(() => { 
            if (window.parent.cerrarMinijuego) {
                window.parent.cerrarMinijuego(); 
            }
        }, 1500);
    }
}

// COORDENADAS ACTUALIZADAS:
// Eje 1 (Grande): Base en (150, 200) -> Radio 55
setupGear("#gear-1", "#t-1", 4, 1, 150, 200); 

// Eje 2 (Mediano): A la derecha del 1 -> Distancia = 55 + 42.5 = 97.5px
setupGear("#gear-2", "#t-2", 3, -1, 150 + 97.5, 200); 

// Eje 3 (Pequeño): Debajo del 2 -> Distancia = 42.5 + 32.5 = 75px
setupGear("#gear-3", "#t-3", 2, 1, 150 + 97.5, 200 + 75); 

// Eje 4 (Mini): A la DERECHA del 3 -> Distancia = 32.5 + 22.5 = 55px
// Se suma 55 a la coordenada X del engranaje Pequeño
setupGear("#gear-4", "#t-4", 1.5, -1, (150 + 97.5) + 55, 200 + 75);