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
