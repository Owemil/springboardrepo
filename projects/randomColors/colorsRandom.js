


function randomRGB () {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`
}


const h1 = document.querySelector('h1');
const letters = document.querySelectorAll('.letter');
const body = document.querySelector('body');

body.style.backgroundColor = 'black';
h1.style.textAlign = 'center';
h1.style.marginTop = '20%';


for(let letter of letters) {
    setInterval(function() {
        letter.style.color = randomRGB()
    }, 500)
    letter.style.fontSize = '180px';
    letter.style.transition = 'color 500ms ease-in'; 
    letter.style.padding = '4%';
}










