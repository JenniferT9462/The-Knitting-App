console.log('Hello from search.js!');
//Function for searching Ravelry patterns with query user input
let query = document.getElementById('patternSearch');
let output = document.getElementById('searchOutput')
async function patternQuery() {
    console.log('Button is Alive!!');
    const queryInput = query.value;
    const url = `https://api.ravelry.com/patterns/search.json?query=${queryInput}+free`;
    const response = await fetch(url, {
        method: 'GET',
        headers: headers
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    //Proof of Life
    console.log(data);
    for (let i = 0; i < data.patterns.length; i++) {
        output.innerHTML += `
            <div class="col">
                <img src="${data.patterns[i].first_photo.thumbnail_url}">
                <p>Name: ${data.patterns[i].name}</p>
                <p>By: ${data.patterns[i].designer.name}</p>
                <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="patternsById(${data.patterns[i].id})">
                    Get Details
                </button>
                <br><br>
            </div>
            
    `};
    
};
let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', patternQuery);


//Function for onclick that I called in the patternQuery function 
async function patternsById(ids) {
    console.log('patternsById is Alive!');
    
    const idUrl = `https://api.ravelry.com/patterns.json?ids=${ids}`;
    const response2 = await fetch(idUrl, {
        method: 'GET',
        headers: headers
    });
    if (!response2.ok) {
        throw new Error('Network response was not ok');
    }
    const data2 = await response2.json();
    //Proof of Life
    console.log(data2);
    //Proof of Life - factory function
    let details = createPattern(data2, ids);
    //TODO: Render cleaned up pattern details to modal or css popup
    console.log(details);
    renderDetails(details);
    patterns.push(details);
};








      