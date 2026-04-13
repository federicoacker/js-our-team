// Oggetto che contiene tutti i vari agganci all'html che abbiamo fatto. Il container del team e la form
const dom = {
    teamContainer: document.querySelector(".team-container>.row"),
    formData:{
        formEl: document.querySelector(".form-container>.form"),
        formNameEl: document.querySelector("#form-name"),
        formRoleEl: document.querySelector("#form-role"),
        formEmailEl: document.querySelector("#form-email"),
        formImageEl: document.querySelector("#form-image"),
    }
}

//Funzione per creare una nuova stringa formattata HTML partendo da un oggetto teamMember che gli viene passato (Non faccio validazione perché mi aspetto di non essere deficiente (e perché sono stanco e mi sono ricordato solo ora della validazione))
function createElement(teamMember){
    const tmpString = `
    <div class="team-entry col-8 offset-2 offset-md-0 col-md-6 col-lg-4">
        <div class="team-card row g-0">
            <div class="col-12 col-xxl-5 d-flex p-2 align-items-center justify-content-center">
                <div class="team-card-image">
                    <img class="img-fluid" src="${teamMember.img}" alt="${teamMember.name}">
                </div>
            </div>
            <div class="team-card-body col-12 col-xxl-7 d-flex flex-column justify-content-center text-center text-xxl-start row-gap-2 px-3 py-2">
                <h2 class="card-name">${teamMember.name}</h2>
                <p class="card-role">${teamMember.role}</p>
                <a href="mailto:${teamMember.email}" class="card-email">${teamMember.email}</a>
            </div>
        </div>
    </div>
    `
    //Semplicemente crea la stringa basandosi sull'html statico che avevo fatto per avere la card che piaceva a me ma lo popola coi dati del teamMember che gli viene passato
    //Avevo provato a farla col document.createElement ma mi sono rapidamente reso conto che mi avrebbero rinchiuso in manicomio se avessero visto cosa stavo facendo un div alla volta
    return tmpString;
}

//Funzione che renderizza il team in pagina ogni volta
function renderTeam(){
    let tmpString = ``; // In pratica prepara una stringa vuota
    for(member of teamMembers){ // Scorre l'array di membri
        tmpString += createElement(member); // Crea una stringa Html per quel membro e la aggiunge alla stringa temporanea
    } 
    dom.teamContainer.innerHTML = tmpString; // Va a inserire tutto il nostro codice html dentro il teamContainer
}

//Funzione per basilare validazione delle stringhe
function validateString(string){ 
    const sanitizedString = string.trim(); // Taglia spazi avanti e dietro
    if(sanitizedString === ""){ // Controlla che non sia vuota, se lo è restituisce un array con false e null dentro
        return [false, null];
    }
    //Altrimenti restituisce un array con true e la string sanificata
    return [true, sanitizedString];
}

//Funzione handler per il submit della form restituisce false se ci sono errori
function formSubmitHandler(event){
    event.preventDefault(); // sbarazziamoci del refresh di pagina
    const errorFlag = false; // flag di errore, se dovesse succedere qualcosa durante la validazione
    const {formNameEl, formRoleEl, formEmailEl, formImageEl} = dom.formData; // destructuring di formData per recuperare i vari elementi di cui vogliamo rubare il value
    // validazione:
    const [nameResult, name] = validateString(formNameEl.value); // ci prendiamo boolean e stringa sanificata, se presente per il nome
    const [roleResult, role] = validateString(formRoleEl.value); // ci prendiamo boolean e stringa sanificata, se presente per il ruolo
    const [emailResult, email] = validateString(formEmailEl.value); // ci prendiamo boolean e stringa sanificata, se presente per la email
    const [imageResult, image] = validateString(formImageEl.value); // ci prendiamo boolean e stringa sanificata, se presente per l'immagine (che tanto è una stringa per ora)

    //A seconda di quali risultati abbiamo ottenuto, stampiamo gli errori, la errorFlag viene settata a true da qualunque ciclo if scatti qui
    if(!nameResult){
        console.error("Nome inserito non valido");
        errorFlag = true;
    }
    if(!roleResult){
        console.error("Ruolo inserito non valido");
        errorFlag = true;
    }
    if(!emailResult){
        console.error("Email inserita non valida");
        errorFlag = true;
    }
    if(!imageResult){
        console.error("Immagine inserita non valida");
        errorFlag = true;
    }
    //Alla fine, se la errorFlag è true, c'è stato un problema, che abbiamo mandato in console già, e usciamo dalla funzione
    if(errorFlag){
        return false;
    }
    //Altrimenti, abbiamo tutte le nostre stringhe sanificate
    // Creazione nuovo member:
    const newMember = createMember(name, role, email, image); // Creiamo un nuovo membro con la nostra funzione apposita che fa 1 sola cosa nella vita
    // Aggiunta nuovo member:
    const [result, resultMessage] = addMember(newMember); //Aggiungiamo il membro al nostro array di members con la nostra funnzione apposita che fa 30 controlli nella vita e ci ridà un booleano e un messaggio d'errore
    // Controllo finale per l'errore:
    if(!result){
        console.error(resultMessage);
        return false;
    }
    //Già che ci sono pulisco i campi di input
    formNameEl.value = "";
    formRoleEl.value = "";
    formEmailEl.value= "";
    formImageEl.value= "";
    //Solo alla fine, faccio il render
    renderTeam();
}

//Funzione che crea un nuovo membro (non sto a spiegarla, prende i valori in ingresso, li mette nell'oggetto newMember e ti ridà l'oggetto)
function createMember(name, role, email, img){
    const newMember = {
        name,
        role,
        email,
        img: `./img/${img}`
    }
    return newMember;
}

//Funzione per aggiungere nuovo membro all'array
function addMember(member){
    //Lei riceve un member, ma chi me lo dice che member è un oggetto fatto proprio come voglio io? Lo dico io, visto che la chiamo io questa funzione, ma ahimé, posso rincoglionirmi anche io, quindi:
    if(typeof(member) !== "object"){ // Controlliamo se è un oggetto innanzitutto
        return [false, "Ciò che hai passato ad addMember non è un oggetto"]; // se non lo è, restituisco falso e messaggio d'errore
    }
    if(!member.name){ // Controlliamo che abbia la proprietà name
        return [false, "Ciò che hai passato ad addMember non ha la proprietà name"]; // Se non la ha, restituisco falso e messaggio d'errore
    }
    if(!member.role){ // Controlliamo che abbia la proprietà role
        return [false, "Ciò che hai passato ad addMember non ha la proprietà role"]; // Se non la ha, restituisco falso e messaggio d'errore
    }
    if(!member.email){ // Controlliamo che abbia la proprietà email
        return [false, "Ciò che hai passato ad addMember non ha la proprietà email"]; // Se non la ha, restituisco falso e messaggio d'errore
    }
    if(!member.img){ // Controlliamo che abbia la proprietà img
        return [false, "Ciò che hai passato ad addMember non ha la proprietà img"]; // Se non la ha, restituisco falso e messaggio d'errore
    }
    
    //Altrimenti, lo pushiamo nell'array
    teamMembers.push(member);
    return [true, null]; // E per coerenza, restituiamo true e null
}