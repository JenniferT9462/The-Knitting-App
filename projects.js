console.log('Hello from projects.js!');

let projectsOutput = document.getElementById('projectsOutput');
let saveProjectBtn = document.getElementById('saveProjectBtn');
let projectCount = document.getElementById('projectCount');

let worksInProgress = [];
//Popup a form to start new project

function addProjects() {
    console.log('saveProjectBtn is Alive!');
    let projectName = document.getElementById('projectName').value;
    const myProject = new Project(projectName);
    let taskName = document.getElementById('addTask').value;
    myProject.addTask(taskName);
    myProject.getProgress();
    myProject.displayProgress();
    worksInProgress.push(myProject);
    //Save to local storage
    saveProjects();
    //Clear output before render updated projects
    projectsOutput.innerHTML = '';
    //Render Updated WIPs
    renderProjects();
    //Proof of Life
    console.log(worksInProgress);
    
}
//Proof of Life
console.log(worksInProgress);

saveProjectBtn.addEventListener('click', addProjects);
class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.completedTasks = 0;
    }
    addTask(task) {
        this.tasks.push({task, completed: false});
    }
    completedTasks(taskName) {
        const task = this.tasks.find(t => t.task === taskName);
        if (task && !task.completed) {
            task.completed = true;
            this.completedTasks++;
        }
    }
    getProgress() {
        return (this.completedTasks / this.tasks.length) * 100;
    }
    displayProgress() {
        console.log(`Project: ${this.name}`);
        console.log(`Progress: ${this.getProgress().toFixed(2)}%`);
        this.tasks.forEach(t => {
            console.log(`- ${t.task} [${t.completed ? 'completed' : 'pending'}]`);
        });
    }
}
let idCounter = 3;
function serializedProject(project) {
    return {
        name: project.name,
        tasks: project.tasks,
        completedTasks: project.completedTasks,
        id: idCounter++
    }
}

function renderProjects() {
    //Project count
    let storedProjects = JSON.parse(localStorage.getItem('myProjects'));
    console.log(storedProjects)
    projectCount.innerHTML = storedProjects.length;
    for (let i = 0; i < storedProjects.length; i++) {
        projectsOutput.innerHTML += `
            <div class="col">
                <div class="card" style="width: 16rem;">
                    <h4 class="card-title text-center">${storedProjects[i].name}</h4>
                    <div class="card-body">
                        <p class="card-text">Tasks: ${storedProjects[i].tasks[0].task}</p>
                        <p class="card-text">Completed Tasks: ${storedProjects[i].completedTasks}</p>
                        <p class="card-text">Completed: ${storedProjects[i].tasks[0].completed}</p>
                        <button class="btn btn-danger btn-sm" onclick="deleteProject(${storedProjects[i].id})">Delete</button>
                        <button class="btn btn-success btn-sm">Mark Complete</button>
                        <button class="addTaskBtn btn btn-warning btn-sm">Add Task</button>
                    </div>
                </div>
            </div>
        `;
    }
    

}
renderProjects();


function deleteProject(id) {
    console.log('deleteProjectsBtn is Alive!');
    //Get projects from local storage
    const storedProjects = JSON.parse(localStorage.getItem('myProjects'));
    //The object I want to single out and delete from the local storage array
    const targetObject = id;
    //Since myPatterns in local storage is an array I have to loop thru
    for (let i = 0; i < storedProjects.length; i++) {
        //If the id matches any of the objects in the list
        if (storedProjects[i].id === targetObject) {
            storedProjects.splice(i, 1);
            break;
        }
    }
    //Update local storage
    localStorage.setItem('myProjects', JSON.stringify(storedProjects));
    //Empty pattern output before rendering so it doesn't double render
    projectsOutput.innerHTML = '';
    //Render updated patterns
    renderProjects();
    //Update my projects count
    projectCount = storedProjects.length;
}
let addTaskBtn = document.querySelectorAll('.addTaskBtn');
function addTask() {
    console.log('taskBtn is Alive!');
    const userInput = prompt("Enter new task:");
    console.log("User input:", userInput);
} 
addTaskBtn.forEach(btn => {
    btn.addEventListener('click', addTask);
});
