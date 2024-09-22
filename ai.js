console.log('Hello from ai.js!')
let apiKey = 'Bearer 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';

let aiOutput = document.getElementById('aiOutput');
let typeInput = document.getElementById('type');

let url = 'https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct/v1/chat/completions';
let getInstructionsBtn = document.getElementById('getInstructionsBtn');
async function fetchStepByStep() {
    let typeInputValue = typeInput.value;
    let prompt = `A cute saying about knitting a ${typeInputValue}.`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "messages": [
                {
                    "role": "user",
                    "content": JSON.stringify(prompt)
                }
            ],
            "max-tokens": 500,
            "stream": false
        })
    });
    const data = await response.json();
    console.log(data);
    renderInspiration(data);
};
getInstructionsBtn.addEventListener('click', fetchStepByStep);

function renderInspiration(data) {
    aiOutput.innerHTML = data.choices[0].message.content

}

