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
    </div>`
}