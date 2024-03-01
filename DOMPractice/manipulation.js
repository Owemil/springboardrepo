document.getElementById('container')

document.querySelector('#container')

document.querySelectorAll('.second')

document.querySelector('ol .third')

const section = document.querySelector('#container')
section.InnerText = 'Hello!'

const divFooter = document.querySelector('.footer')
divFooter.classList += ' main'

divFooter.classList.remove('main')

const newLi = document.createElement('li')
newLi.innerText = 'Four'

const ul = document.querySelector('ul')
ul.append(newLi)

const ol = document.querySelector('ol')
const allLi = document.querySelectorAll('ol li')
for (let li of allLi) {
    li.style.color = 'green'
}

divFooter.remove()