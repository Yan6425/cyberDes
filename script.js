var threshold = 15; // Sensibilité du secouement
var shakeDuration = 500;
var shakePeriod = 100;
var firstShakeTime = 0;
var lastShakeTime = 0; // Temps de la dernière secousse enregistrée

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
            placerDes(nbDes);
            lancerDes(nbDes);
        }
        else if (now - firstShakeTime < shakeDuration) {
            lastShakeTime = now;
        }
    }
});


const nbLignes = 4;
const nbColonnes = 4;
const table = document.getElementById('table'); 
const nbDesMax = 5;
let nbDes = nbDesMax;
let tblDes = [];


for (let i = 0; i < nbLignes; i++) {
    table.appendChild(document.createElement('tr'));
    for (let j = 0; j < nbColonnes; j++) {
        table.children[i].appendChild(document.createElement('th'));
    }    
}    


function initialiserTblDes() {
    nbDes = nbDesMax;
    tblDes = [];
    let de;
    for (let i = 0; i < nbDes; i++) {
        de = document.createElement('div');
        de.className = 'de';
        de.addEventListener('click', enleverDe);
        tblDes.push(de);
    }
}

function enleverDe() {
    nbDes--;
    this.remove();
    tblDes[tblDes.indexOf(this)] = tblDes[nbDes];
    delete tblDes[nbDes];
    if (!nbDes) {
        initialiserTblDes(nbDesMax);
    }
}


function cucaracha() {
    placerDes();
    lancerDes();
}

// Fonction à exécuter quand on détecte une secousse
function placerDes() {
    let tblCoords = [];
    for (let i = 0; i < nbDes; i++) {
        let coords = [0, 0];
        do {
            coords[0] = Math.floor(Math.random() * nbLignes);
            coords[1] = Math.floor(Math.random() * nbColonnes);
        } while (tblCoords.includes(coords) && nbDes < nbColonnes * nbLignes);
        tblCoords.push(coords);
    }
    for (let i = 0; i < nbDes; i++) {
        table.children[tblCoords[i][0]].children[tblCoords[i][1]].appendChild(tblDes[i]);
    }
}

function lancerDes() {
    document.querySelectorAll('.de').forEach(de => {
        de.className = "de de" + Math.ceil(Math.random() * 6);
    })
}


initialiserTblDes(nbDesMax);
placerDes(nbDes);
lancerDes(nbDes);