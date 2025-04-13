window.onload = () => {
    afficherQuestion(0); // Charge les questions
    const bruteforceBtn = document.getElementById("bruteforce-btn");
    
    if (bruteforceBtn) {
        bruteforceBtn.addEventListener("click", bruteforce);
    } else {
        console.error("Le bouton bruteforce-btn n'existe pas !");
    }
};

const originalConsoleError = console.error;
console.error = function (message) {
    if (!message.includes("ERR_ABORTED") && !message.includes("404")) {
        originalConsoleError.apply(console, arguments);
    }
};


const questionnaire = [ // Questions et réponses respectives
    {
        qlabel: "De quelle couleur est le survêtement Adibreak ?",
        qid: 1,
        reponses: [
            { rlabel: "Vert", rid: 1 },
            { rlabel: "Bleu", rid: 2 },
            { rlabel: "Noir", rid: 3 },
            { rlabel: "Beige", rid: 4 }
        ]
    },
    {
        qlabel: "Les birkenstock sont des :",
        qid: 2,
        reponses: [
            { rlabel: "Baskets", rid: 1 },
            { rlabel: "Mocassins", rid: 2 },
            { rlabel: "Sandales", rid: 3 },
            { rlabel: "Claquettes", rid: 4 }
        ]
    },
    {
        qlabel: "Your Turn ont un T-Shirt sur la ville de :",
        qid: 3,
        reponses: [
            { rlabel: "Alger", rid: 1 },
            { rlabel: "Paris", rid: 2 },
            { rlabel: "Riyadh", rid: 3 },
            { rlabel: "Rome", rid: 4 }
        ]
    },
    {
        qlabel: "Quelle est la marque de la balaclava ?",
        qid: 4,
        reponses: [
            { rlabel: "New Era", rid: 1 },
            { rlabel: "Karl Kani", rid: 2 },
            { rlabel: "'47", rid: 3 },
            { rlabel: "Nike", rid: 4 }
        ]
    },
    {
        qlabel: "Quelle est la marque de la montre la plus chère ?",
        qid: 5,
        reponses: [
            { rlabel: "Versace", rid: 1 },
            { rlabel: "Casio", rid: 2 },
            { rlabel: "Ferragamo", rid: 3 },
            { rlabel: "Guess", rid: 4 }
        ]
    }
];

const bonnesReponses = "A1_1-A2_3-A3_4-A4_1-A5_3";
let reponses = "";
let questionIndex = 0;

function afficherQuestion(index) {
    const question = questionnaire[index];
    const questionElement = document.getElementById("question");
    const reponseElement = document.getElementById("reponses");
    const resultElement = document.getElementById("result");

    questionElement.innerHTML = question.qlabel;
    reponseElement.innerHTML = "";
    resultElement.innerHTML = "";

    question.reponses.forEach((reponse) => {
        const button = document.createElement("button");
        button.textContent = reponse.rlabel;
        button.className = "btn btn-accent";
        button.style = "margin:10px";
        button.onclick = () => handleReponseClick(question.qid, reponse.rid);
        reponseElement.appendChild(button);
    });
}

function handleReponseClick(qid, rid) {
    reponses += (reponses ? "-" : "") + `A${qid}_${rid}`;
    questionIndex++;

    if (questionIndex < questionnaire.length) {
        afficherQuestion(questionIndex);
    } else {
        verifierReponses();
    }
}

function verifierReponses() {
    const resultElement = document.getElementById("result");
    const questionElement = document.getElementById("question");
    const reponseElement = document.getElementById("reponses");

    if (reponses === bonnesReponses) {
        // Redirection vers contact.html
        location.href = "contact.html";
    } else {
        resultElement.innerHTML = `<p class="text-red-600 font-bold text-center">Tu n'as pas les bonnes réponses pour me contacter.</p>`;
        questionElement.innerHTML = "";
        const bruteforceBtn = document.getElementById("bruteforce-btn");
        bruteforceBtn.classList.add("hidden");
        reponseElement.innerHTML = "";

        const retryButton = document.createElement("button");
        retryButton.textContent = "Recommencer";
        retryButton.className = "cursor-pointer rounded-md mt-6 bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2";
        retryButton.onclick = recommencer;
        resultElement.appendChild(retryButton);
    }
}


function recommencer() {
    const bruteforceBtn = document.getElementById("bruteforce-btn");
    bruteforceBtn.classList.remove("hidden");
    reponses = "";
    questionIndex = 0;
    afficherQuestion(0);
}

function bruteforce() {
    const resultDiv = document.getElementById("result");
    const spinner = document.getElementById("spinner");
    const countdownDiv = document.getElementById("countdown");
    const questionDiv = document.getElementById("question");
    const reponsesDiv = document.getElementById("reponses");
    const bruteforceBtn = document.getElementById("bruteforce-btn");

    if (reponsesDiv) reponsesDiv.innerHTML = "";
    if (bruteforceBtn) bruteforceBtn.classList.add("hidden");

    questionDiv.textContent = "Bruteforce en cours...";
    spinner.classList.remove("hidden");
    countdownDiv.textContent = "";
    resultDiv.innerHTML = "";

    let total = 0;
    let delay = 0;
    let found = false;
    const bonnesReponses = "A1_1-A2_3-A3_4-A4_1-A5_3";

    for (let i1 = 1; i1 <= 4; i1++) {
        for (let i2 = 1; i2 <= 4; i2++) {
            for (let i3 = 1; i3 <= 4; i3++) {
                for (let i4 = 1; i4 <= 4; i4++) {
                    for (let i5 = 1; i5 <= 4; i5++) {
                        const combination = `A1_${i1}-A2_${i2}-A3_${i3}-A4_${i4}-A5_${i5}`;
                        setTimeout(() => {
                            if (found) return;

                            total++;
                            resultDiv.innerHTML = `
                                 Test #${total}<br>
                                 <span class="font-mono">${combination}</span>
                            `;

                            if (combination === bonnesReponses) {
                                found = true;
                                spinner.classList.add("hidden");
                                questionDiv.textContent = "Bruteforce réussi !";
                                resultDiv.innerHTML = `
                                     <strong>Bonne combinaison trouvée !</strong><br>
                                     <span class="font-mono">${combination}</span><br>
                                     ${total} combinaisons testées
                                `;

                                let countdown = 5;
                                countdownDiv.textContent = `Redirection dans ${countdown} secondes...`;
                                const interval = setInterval(() => {
                                    countdown--;
                                    countdownDiv.textContent = `Redirection dans ${countdown} secondes...`;
                                    if (countdown === 0) {
                                        clearInterval(interval);
                                        window.location.href = "contact.html";
                                    }
                                }, 1000);
                            }
                        }, delay);
                        delay += 30; // rend le test visible mais rapide
                    }
                }
            }
        }
    }
}






// Vérifie l'existence d'un fichier via requête HEAD synchrone
function verifierFichierExiste(fileName) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", fileName, false);
    try {
        xhr.send();
        return xhr.status === 200;
    } catch (err) {
        return false;
    }
}
