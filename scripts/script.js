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

    return tmpString;
}

function renderTeam(){
    let tmpString = ``;
    for(member of teamMembers){
        tmpString += createElement(member);
    }
    dom.teamContainer.innerHTML = tmpString;
}

renderTeam();

function validateString(string){
    const sanitizedString = string.trim();
    if(sanitizedString === ""){
        return false;
    }
    return [true, sanitizedString];
}

function formSubmitHandler(event){
    event.preventDefault();
    const errorFlag = false;
    const {formNameEl, formRoleEl, formEmailEl, formImageEl} = dom.formData;
    // validazione:
    const [nameResult, name] = validateString(formNameEl.value);
    const [roleResult, role] = validateString(formRoleEl.value);
    const [emailResult, email] = validateString(formEmailEl.value);
    const [imageResult, image] = validateString(formImageEl.value);

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
    if(errorFlag){
        return;
    }
    // Creazione nuovo member:
    const newMember = createMember(name, role, email, image);
    // Aggiunta nuovo member:
    const [result, resultMessage] = addMember(newMember);
    // Controllo finale per l'errore:
    if(!result){
        console.error(resultMessage);
    }
    //Solo alla fine, faccio il render
    renderTeam();
}
function createMember(name, role, email, img){
    const newMember = {
        name,
        role,
        email,
        img
    }
    return newMember;
}
function addMember(member){
    if(typeof(member) !== "object"){
        return [false, "Ciò che hai passato ad addMember non è un oggetto"];
    }
    if(!member.name){
        return [false, "Ciò che hai passato ad addMember non ha la proprietà name"];
    }
    if(!member.role){
        return [false, "Ciò che hai passato ad addMember non ha la proprietà role"];
    }
    if(!member.email){
        return [false, "Ciò che hai passato ad addMember non ha la proprietà email"];
    }
    if(!member.img){
        return [false, "Ciò che hai passato ad addMember non ha la proprietà img"];
    }

    teamMembers.push(member);
    return [true, null];
}
dom.formData.formEl.addEventListener("submit", formSubmitHandler);