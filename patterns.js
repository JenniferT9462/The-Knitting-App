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
    savePatterns(patterns)
    //Clears patterns - so next time it will only have the last/one pattern in patterns array
    patterns = [];
};

function renderPatterns() {
    myPatterns = JSON.parse(localStorage.getItem('myPatterns')) || [];
    //Proof of Life and seeing the paths to each detail that I need to render
    console.log(myPatterns);
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
                    <a href="#" class="btn btn-success btn-sm">Add to Projects</a>
                </div>
             </div>
            </div>
        `;
    }
    //Adds myPatterns count
    patternCountOutput.innerHTML = myPatterns.length;
}
renderPatterns();




