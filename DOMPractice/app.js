document.getElementById('gallery');

document.querySelectorAll('p')
const allP = document.querySelectorAll('p')
for (let p of allP) {
    p.style.color = 'blue';
}

document.getElementsByTagName('h2')
const allH2s = document.getElementsByTagName('h2');
for(let h2 of allH2s) {
    h2.style.color = 'green';
}

document.getElementsByTagName('img')
const allPics = document.getElementsByTagName('img');
for (let p of allPics) {
    p.style.width = '100px';
    p.style.border = '2px solid pink';
}
