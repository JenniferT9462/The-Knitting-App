console.log('Hello from projects.js!');

let projectsOutput = document.getElementById('projectsOutput');
let saveProjectBtn = document.getElementById('saveProjectBtn');
let projectCount = document.getElementById('projectCount');
let projectName = document.getElementById('projectName');
let addType = document.getElementById('addType')
let worksInProgress = {};
//Popup a form to start new project
worksInProgress.projects = [];


//let nameInput = projectName.value;
//let typeInput = addType.value;
//Create project
//title...tasks...type...
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
let myProject = projectCreator('I walk the line', 'socks');
myProject.addTask('Buy Yarn');
console.log(myProject);
myProject.completeTask('Buy Yarn');
console.log(myProject);
myProject.displayStatus();
