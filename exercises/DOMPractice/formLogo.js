// const removeButtons = document.querySelectorAll('li button');
// const form = document.querySelector('#add-friend')
// const input = document.querySelector('#first-name')
// const ul = document.querySelector('#friend-list')

// for (let button of removeButtons) {
//     button.addEventListener('click', function(e){
//         e.target.parentElement.remove();
//     })
// }


// form.addEventListener('submit', function(e){
// e.preventDefault();
// console.log(input.value);
// const li = document.createElement('li');
// li.innerText = input.value;
// input.value = '';
// const newBtn = document.createElement('button');
// newBtn.innerText = 'Remove';
// li.append(newBtn);
// ul.append(li);

// })



const form = document.querySelector('#add-friend')
const input = document.querySelector('#first-name')
const ul = document.querySelector('#friend-list')

ul.addEventListener('click', function(e){
    if (e.target.tagName === 'BUTTON'){
    e.target.parentElement.remove()
}   else if( e.target.tagName === 'LI'){
    e.target.classList.toggle('best-friend')
    const heart = document.createElement('span')
    heart.innerHTML = '&#10084;'
    e.target.prepend(heart)
} 
   
})

form.addEventListener('submit', function(e){
e.preventDefault();
console.log(input.value);
const li = document.createElement('li');
li.innerText = input.value;
input.value = '';
const newBtn = document.createElement('button');
newBtn.innerText = 'Remove';
li.append(newBtn);
ul.append(li);

})