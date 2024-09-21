console.log('Hello from patterns.js');

let detailsOutput = document.getElementById('detailsOutput');
function renderDetails(object) {
    detailsOutput.innerHTML = `
         <h4>${object.name}</h4>
         <img src="${object.image}">
         <p>Download Location: <a href="${object.download}" target="_blank">Download</a></p>
         <p>Gauge: ${object.gauge}</p>
         <p>Yarn: ${object.yarn}</p>
         <p>Needle Size: ${object.needle_size}</p>
         <p>Yardage: ${object.yardage}</p>
    `
};

let addToMyPatternsBtn = document.getElementById('addToMyPatternsBtn');
let patternsOutput = document.getElementById('patternsOutput');
let patternCountOutput = document.getElementById('patternCountOutput');
function addToMyPatterns() {
    console.log('Patterns Button is Alive!');
    console.log(patterns);
    //Push patterns into myPatterns
    myPatterns.push(patterns);
    //Proof of Life
    console.log(myPatterns);
    //Save new pattern to local storage
    savePatterns(myPatterns);
    //Render in real-time...fingers-crossed
    patternsOutput.innerHTML = '';
    renderPatterns();
    //Clears patterns - so next time it will only have the last/one pattern in patterns array
    patterns = [];
};
addToMyPatternsBtn.addEventListener('click', addToMyPatterns);

function renderPatterns() {
    myPatterns = JSON.parse(localStorage.getItem('myPatterns')) || [];
    //Proof of Life and seeing the paths to each detail that I need to render
    console.log(myPatterns);
    //Adds myPatterns count
    patternCountOutput.innerHTML = myPatterns.length;
    for (let i = 0; i < myPatterns.length; i++) {
        // console.log(myPatterns[i][0].name);
        patternsOutput.innerHTML += `
            <div class="col">
             <div class="card" style="width: 200px;">
                <img src="${myPatterns[i][0].image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${myPatterns[i][0].name}</h5>
                    <a href="${myPatterns[i][0].download}" target="_blank" class="card-link">Download</a>
                    <p class="card-text">Yarn: ${myPatterns[i][0].yarn}</p>
                    <p class="card-text">Gauge: ${myPatterns[i][0].gauge}</p>
                    <p class="card-text">Needle Size: ${myPatterns[i][0].needle_size}</p>
                    <p class="card-text">Yardage: ${myPatterns[i][0].yardage}</p>
                    <button class="btn btn-success btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2">Start Project</button>
                    <button type="button" class="btn btn-danger btn-sm" onclick="deletePattern(${myPatterns[i][0].id})">Delete</button>
                </div>
             </div>
            </div>
        `;
    }
    
}
renderPatterns();

let deleteBtn = document.querySelectorAll('.deleteBtn');
//Did another onclick to access the id and use in the function
function deletePattern(id) {
    console.log('deleteBtn is Alive!');
    //Get myPatterns from local storage
    const storedPatterns = JSON.parse(localStorage.getItem('myPatterns'));
    //The object I want to single out and delete from the local storage array
    const targetObject = id;
    //Since myPatterns in local storage is an array I have to loop thru
    for (let i = 0; i < storedPatterns.length; i++) {
        //If the id matches any of the objects in the list
        if (storedPatterns[i][0].id === targetObject) {
            //Delete that object by using it's index
            storedPatterns.splice(i, 1);
            break;
        }

    }
    //Update local storage
    localStorage.setItem('myPatterns', JSON.stringify(storedPatterns));
    //Empty pattern output before rendering so it doesn't double render
    patternsOutput.innerHTML = '';
    //Render updated patterns
    renderPatterns();
    //Update my patterns count
    patternCountOutput = myPatterns.length;
}






