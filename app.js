console.log('Hello from app.js');
//Handles the main logic of the application, local storage management
//Fetch with Username and Password Authorization
const username = 'read-b825a6f85ea6c17692eb433a9bb5668d';
const password = '4Nf33VTwOJW3j/TfgxH3/S0w/9YD3M3NTNW5/r0m';

const headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

//This is going to be my state
let patterns = [];
//This is where I will store patterns
let myPatterns = [];

//Factory function for myPatterns array
function createPattern(data, ids) {
    return {
    name: data.patterns[ids].name,
    download: data.patterns[ids].download_location.url,
    image: data.patterns[ids].photos[0].thumbnail_url,
    gauge: data.patterns[ids].gauge_description,
    yarn: data.patterns[ids].yarn_weight_description,
    yardage: data.patterns[ids].yardage,
    needle_size: data.patterns[ids].pattern_needle_sizes[0].name
    }
};

//Saving patterns to local storage...
// It parses it as JSON and returns it as a JavaScript object 
// or array. If no data exists or the parsing fails, it returns 
// an empty array. 
function savePatterns(data) {
    let existingData = JSON.parse(localStorage.getItem('myPatterns'))|| []; 
    // Add new data to existing data
    existingData.push(data);
    // Save updated data back to local storage
    localStorage.setItem('myPatterns', JSON.stringify(existingData));
};