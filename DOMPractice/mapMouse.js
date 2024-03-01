const body = document.querySelector('body')

document.addEventListener('mousemove', function(e){
    let width = window.innerWidth/255
    let height = window.innerHeight/255
    let pageX = e.pageX / width
    let pageY = e.pageY / height
    let r = Math.round(pageX)
    let b = Math.round(pageY)
    body.style.backgroundColor = `rgb(${r},0,${b})`
    console.log(`rgb(${r},0,${b}`)
})

// This link helped me understand the math that needed to be done.
//https://stackoverflow.com/questions/21579033/background-color-changing-with-mouse-position-between-2-rgb-colors