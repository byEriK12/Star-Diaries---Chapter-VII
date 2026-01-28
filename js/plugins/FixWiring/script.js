console.clear();
let completedLights = [0, 0, 0, 0];

// CABLE 1
new Draggable('.drag-1', {
  onDrag: function () { updateLine('.line-1', this.x + 120, this.y + 185); },
  onRelease: function () {
    if (this.x === 670 && this.y === 188) {
      toggleLight(2, true);
    } else {
      reset('.drag-1', '.line-1', 70, 185);
      toggleLight(2, false);
    }
  },
  liveSnap: {points: [{x: 670, y: 188}], radius: 20}
});

// CABLE 2
new Draggable('.drag-2', {
  onDrag: function () { updateLine('.line-2', this.x + 120, this.y + 375); },
  onRelease: function () {
    if (this.x === 670 && this.y === -188) {
      toggleLight(1, true);
    } else {
      reset('.drag-2', '.line-2', 60, 375);
      toggleLight(1, false);
    }
  },
  liveSnap: {points: [{x: 670, y: -188}], radius: 20}
});

// CABLE 3
new Draggable('.drag-3', {
  onDrag: function () { updateLine('.line-3', this.x + 120, this.y + 560); },
  onRelease: function () {
    if (this.x === 670 && this.y === 0) {
      toggleLight(3, true);
    } else {
      reset('.drag-3', '.line-3', 60, 560);
      toggleLight(3, false);
    }
  },
  liveSnap: {points: [{x: 670, y: 0}], radius: 20}
});

// CABLE 4
new Draggable('.drag-4', {
  onDrag: function () { updateLine('.line-4', this.x + 120, this.y + 745); },
  onRelease: function () {
    if (this.x === 670 && this.y === 0) {
      toggleLight(4, true);
    } else {
      reset('.drag-4', '.line-4', 60, 745);
      toggleLight(4, false);
    }
  },
  liveSnap: {points: [{x: 670, y: 0}], radius: 20}
});

function updateLine(selector, x, y) {
  gsap.set(selector, { attr: { x2: x, y2: y } });
}

function toggleLight(selector, visibility) {
  if (visibility) {
    completedLights[selector - 1] = 1;
    // CONDICIÓN DE VICTORIA
    if (completedLights[0] === 1 && completedLights[1] === 1 && completedLights[2] === 1 && completedLights[3] === 1) {
      audioTask.play();
      
      // COMUNICACIÓN CON RPG MAKER
      if (window.parent && window.parent.$gameSwitches) {
          window.parent.$gameSwitches.setValue(2, true); // Activa interruptor 2
      }
      
      // Espera un momento para que el jugador vea que ganó y cierra
      window.setTimeout(() => {
          if (window.parent && window.parent.cerrarMinijuego) {
              window.parent.cerrarMinijuego();
          }
      }, 1000);
    }
  } else {
    completedLights[selector - 1] = 0;
  }
  
  gsap.to(`.light-${selector}`, {
    opacity: visibility ? 1 : 0,
    duration: 0.3
  });
}

function reset(drag, line, x, y) {
  gsap.to(drag, { duration: 0.3, ease: 'power2.out', x: 0, y: 0 });
  gsap.to(line, { duration: 0.3, ease: 'power2.out', attr: { x2: x, y2: y } });
}

const audioTask = new Audio('https://assets.codepen.io/127738/Among_Us-Task-complete.mp3');