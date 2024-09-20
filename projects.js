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
    saveProject(myProject);
    worksInProgress.push(myProject);
    //Project count
    console.log(worksInProgress.length);
    projectCount.innerHTML = worksInProgress.length;
    //Proof of Life
    console.log(myProject);
    
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

function saveProject(project) {
    let existingData = JSON.parse(localStorage.getItem('myProjects'))|| [];
    // Add new data to existing data
    existingData.push(project);
    // Save updated data back to local storage
    localStorage.setItem('myProjects', JSON.stringify(project));
};
