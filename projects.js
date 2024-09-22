console.log('Hello from projects.js!');
//Projects state
let worksInProgress = {};
//where new project will go
worksInProgress.projects = [];

//Create project
function projectCreator(name, type) {
    let project = {
        name,
        type,
        tasks: [],
        completedTasks: 0,
        addTask: function(taskName) {
            this.tasks.push({task: taskName, completed: false});
        },
        completeTask: function(taskName) {
            const task = this.tasks.find(t => t.task === taskName);
            if (task && !task.completed) {
                task.completed = true;
                this.completedTasks++;
            }
        },
        getProgress: function() {
            return (this.completedTasks / this.tasks.length) * 100;
        },
        displayStatus: function() {
            console.log(`Title: ${this.name}`);
            console.log(`Progress: ${this.getProgress().toFixed(2)}%`);
            this.tasks.forEach(t => {
                console.log(`- ${t.task} [${t.completed ? 'completed' : 'pending'}]`);
            })
        }
    }
    return project;
}
//Testing
// let myProject = projectCreator('I walk the line', 'socks');
// myProject.addTask('Buy Yarn');
// console.log(myProject);
// myProject.completeTask('Buy Yarn');
// console.log(myProject);
// myProject.displayStatus();


//Popup a form to start new project
let saveProjectBtn = document.getElementById('saveProjectBtn');
let projectName = document.getElementById('projectName');
let addType = document.getElementById('addType')
function saveProject() {
    console.log('save projects btn is alive!')
    let titleInput = projectName.value;
    let typeInput = addType.value;
    let project = projectCreator(titleInput, typeInput);
    let task = prompt('Enter a task for you project:');
    let taskString = task.toString();
    project.addTask(taskString);
    project.displayStatus();
    worksInProgress.projects.push(project);
    saveProjects();
    projectsOutput.innerHTML = '';
    renderProjects();
    projectCount.innerHTML = worksInProgress.projects.length;
};
saveProjectBtn.addEventListener('click', saveProject);

let projectsOutput = document.getElementById('projectsOutput');
let projectCount = document.getElementById('projectCount');

function renderProjects() {
    let myProjects = JSON.parse(localStorage.getItem('myProjects')) || [];
    console.log(myProjects);
    for (let i = 0; i < myProjects.length; i++) {
        projectsOutput.innerHTML += `
            <div class="col">
                <div class="card" style="width: 100px;">
                    <h6 class="card-title">Project Title: ${myProjects[i].name}</h6>
                    <p class="card-text">Project Type: ${myProjects[i].type}</p>
                    <p class="card-text">Start Date: ${myProjects[i].startDate}</p>
                   <!-- <button class="btn btn-success">Add Task</button> -->
                    <button class="btn btn-danger">Delete</button>
                </div>
            </div>
        `;
    }
    projectCount.innerHTML = myProjects.length;
}
renderProjects();

let idCounter = 0;
function cleanUpProject(project) {
    return {
        name: project.name,
        type: project.type,
        id: idCounter++,
        startDate: new Date().toJSON().slice(0, 10)
    }
}
function saveProjects() {
    const cleanProjects = worksInProgress.projects.map(cleanUpProject);
    localStorage.setItem('myProjects', JSON.stringify(cleanProjects));
    console.log(cleanProjects);
}
function loadProjects() {
    let savedProjects = JSON.parse(localStorage.getItem('myProjects')) || [];
    worksInProgress.projects = [];
    projectCount.innerHTML = savedProjects.length;
    for(let i = 0; i < savedProjects.length; i++) {
        worksInProgress.projects.push(projectCreator(savedProjects[i].name, savedProjects[i].type));
        console.log(worksInProgress.projects)
    }
}
loadProjects();


