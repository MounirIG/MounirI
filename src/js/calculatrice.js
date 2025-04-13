function add(value) { // Fonction ajoutant la valeur du bouton à l'affichage
    document.getElementById('display').value += value;
}

function clearDisplay() { // Fonction effaçant l'ensemble de l'affichage
    let display = document.getElementById('display');
    display.value = '';
}

function del() { // Fonction effaçant le dernier élément inséré dans l'affichage
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function resultat() { // Fonction calculant le résultat
    try {
        document.getElementById('display').value = eval(document.getElementById('display').value);
    } catch (error) {
        document.getElementById('display').value = 'Erreur';
    }
}