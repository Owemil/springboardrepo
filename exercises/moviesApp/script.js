
$('#form-container').on('click', '.btn', function (e) {
    e.preventDefault()
    $('ul').append($('<li>' + $('.movie').get(0).value + ' ' + $('.rating').get(0).value + ' ' + '<button class="remove">Remove</button></li>'))
    $('.movie').get(0).value = ''
    $('.rating').get(0).value = ''

})

$('#rating-container').on('click', '.remove', function () {
    $('.remove').parent().remove()
})