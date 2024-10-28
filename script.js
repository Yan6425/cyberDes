var nbLignes = 8;
var nbColonnes = 8;
var table = document.getElementById('table'); 

for (let i = 0; i < nbColonnes; i++) {
    table.appendChild(document.createElement('tr'));
    for (let j = 0; j < nbLignes; j++) {
        table.children[i].appendChild(document.createElement('th'));
    }
}