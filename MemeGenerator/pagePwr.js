// Selecting everything needed. for some reason 'firstImg' and 'secondImg' were working at first then for some reason stopped so I eneded up having to use document.querySelector in their place and some of the code was made longer because of it.
const submit = document.querySelector('.submitBtn')
const remove = document.querySelector('.removeBtn')
const field = document.querySelector('#first-field')
const firstImg = document.querySelector('.first-img')
const secondImg = document.querySelector('.second-img')
const inputImgURL = document.querySelector('.img-url')
const inputTopTxt = document.querySelector('.top-txt')
const inputBtmTxt = document.querySelector('.btm-txt')
const topText = document.querySelector('.topTxt')
const bottomText = document.querySelector('.btmTxt')

// event listener for remove buttons to remove
field.addEventListener('click', function(e){
    if (e.target.tagName === 'BUTTON'){
        e.target.parentElement.remove()
    }
})

//even listener for submit button with functions to make the memes
submit.addEventListener('click', function(e){
    e.preventDefault();
    makeMeme();
    topTxt();
    btmTxt();
    removeButton();
})
// creating and placing the images
function makeMeme(){
    const newDiv = document.createElement('div');
    const newImg = document.createElement('img');
    if (!document.querySelector('.first-img') === true) {
        newDiv.classList.add('first-img');
        newImg.src = inputImgURL.value;
        newDiv.append(newImg);
        field.append(newDiv);
        inputImgURL.value = '';
    } else {
        newDiv.classList.add('second-img');
        newImg.src = inputImgURL.value;
        newDiv.append(newImg);
        field.append(newDiv);
        inputImgURL.value = '';
    }
}
//creating and placing the top text
function topTxt() {
    const newDiv = document.createElement('div');
    const newP = document.createElement('p');
    newDiv.classList.add('topTxt');
    newP.innerText = inputTopTxt.value;
    newDiv.append(newP);
    if (document.querySelector('.first-img').contains(document.querySelector('.topTxt'))){
        document.querySelector('.second-img').append(newDiv);
        inputTopTxt.value = '';
    } else {
        document.querySelector('.first-img').append(newDiv);
        inputTopTxt.value = '';
    }
}
// creating and palceing the bottom text
function btmTxt() {
    const newDiv = document.createElement('div');
    const newP = document.createElement('p');
    newDiv.classList.add('btmTxt');
    newP.innerText = inputBtmTxt.value;
    newDiv.append(newP)
    if (document.querySelector('.first-img').contains(document.querySelector('.btmTxt'))){
        document.querySelector('.second-img').append(newDiv)
        inputBtmTxt.value = '';
    } else {
        document.querySelector('.first-img').append(newDiv)
        inputBtmTxt.value = '';
    }
}
//creating and placing the remove buttons
function removeButton() {
    const newBtn = document.createElement('button')
    newBtn.classList.add('removeBtn')
    newBtn.innerText = 'X'
    if (document.querySelector('.first-img').contains(document.querySelector('.removeBtn'))){
        document.querySelector('.second-img').append(newBtn)
    } else {
        document.querySelector('.first-img').append(newBtn)
    }
}

//I feel good about this one. it was fairly tough but I slowly coded through it and feel I hit all the required points. I hope whomever reviews this feels the same.