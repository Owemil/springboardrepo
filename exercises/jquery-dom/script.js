$(function () {
    console.log("Let's get ready to party with jQuery!");
})
$('img').addClass('image-center')
$('p').eq(5).remove()
$('h1').css('font-size', (Math.floor(Math.random() * 100) + 1))
$('ol').append("<li>whatever I want</li>")
$('ol').empty()
$('ol').append("<p>lists suck</p>")
$(".form-control").on('keyup blur change', function () {
    let red = $(".form-control").eq(0).val();
    let blue = $(".form-control").eq(1).val();
    let green = $(".form-control").eq(2).val();
    $("body").css("background-color",
        "rgb(" + red + "," + green + "," + blue + ")");
});
$("img").on('click', function (e) {
    $(e.target).remove();
});