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

// let patternCount = 0;
let addToMyPatternsBtn = document.getElementById('addToMyPatternsBtn');
let patternsOutput = document.getElementById('patternsOutput');
let patternCountOutput = document.getElementById('patternCountOutput');
function addToMyPatterns() {
    console.log('Patterns Button is Alive!');
    console.log(patterns);
    //Push patterns into myPatterns
    myPatterns.push(patterns);
    //Count my patterns
    patternCount++;
    console.log(patternCount);
    //Proof of Life
    console.log(myPatterns);
    //Save new pattern to local storage
    savePatterns(patterns)
    //Clears patterns 
    patterns = [];
};

function renderPatterns() {
    myPatterns = JSON.parse(localStorage.getItem('myPatterns')) || [];
    console.log(myPatterns);
    for (let i = 0; i < myPatterns.length; i++) {
        // console.log(myPatterns[i][0].name);
        patternsOutput.innerHTML += `
          <div class="col">
            <h4>${myPatterns[i][0].name}</h4>
            <img src="${myPatterns[i][0].image}">
            <a href="${myPatterns[i][0].download}" target="_blank">Download</a>
            <p>${myPatterns[i][0].yarn}</p>
            <p>${myPatterns[i][0].yardage}</p>
            <p>${myPatterns[i][0].needle_size}</p>
            <p>${myPatterns[i][0].gauge}</p>
          </div>  
        `;
    }
    patternCountOutput.innerHTML = myPatterns.length;
}
renderPatterns();




