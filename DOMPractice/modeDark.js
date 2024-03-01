const input = document.querySelector('input[type="checkbox"]')

if (localStorage.getItem('darkModeEnabled')) {
    document.body.className = 'darkmode';
    input.checked = true;
}


input.addEventListener('click', function(){
    const { checked } = input;
    if (checked) {
      localStorage.setItem('darkModeEnabled', true)  
    } else {
        localStorage.removeItem('darkModeEnabled')
    }
    document.body.className = checked ? 'darkmode' : ''
    
})