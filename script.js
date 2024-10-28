var nbLignes = 8;
var nbColonnes = 8;
var table = document.getElementById('table'); 

for (let i = 0; i < nbColonnes; i++) {
    table.appendChild(document.createElement('tr'));
    for (let j = 0; j < nbLignes; j++) {
        table.children[i].appendChild(document.createElement('th'));
    }
}

var threshold = 15; // Sensibilité du secouement
var shakeDuration = 500;
var shakePeriod = 100;
var firstShakeTime = 0;
var lastShakeTime = 0; // Temps de la dernière secousse enregistrée

// Fonction à exécuter quand on détecte une secousse
function onShake() {
    document.querySelector('header').style.color = "red";
    // Placez ici la fonction que vous souhaitez exécuter
}

// Détecter les changements de mouvement du téléphone
window.addEventListener('devicemotion', (event) => {
    const { acceleration } = event;

    // Vérifier si l'accélération dépasse le seuil
    if (acceleration && (
        Math.abs(acceleration.x) > threshold ||
        Math.abs(acceleration.y) > threshold ||
        Math.abs(acceleration.z) > threshold
    )) {
        const now = Date.now();
        
        // Vérifier que la secousse précédente date d'au moins 1 seconde
        if (now - lastShakeTime > shakePeriod){
            firstShakeTime = now;
            lastShakeTime = now;
        }
        else if (now - firstShakeTime >= shakeDuration) { // 1000 ms = 1 seconde
            onShake();
        }
        else if (now - firstShakeTime < shakeDuration) {
            lastShakeTime = now;
        }
    }
});
