console.log('Hello from projects.js!');

let projectsOutput = document.getElementById('projectsOutput');
let projectsBtn = document.querySelectorAll('.projectsBtn');

//Popup a form to start new project
function startProject() {
    console.log('projectsBtn is Alive!');
}

//Loop thru the buttons and add an event listener
projectsBtn.forEach((btn) => {
    btn.addEventListener('click', startProject)
})