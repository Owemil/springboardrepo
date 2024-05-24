$('document').ready(getCupCakes())

async function getCupCakes() {
    res = await axios.get(`/api/cupcakes`)
    cupCakes = res.data.cupcakes
    for await (let cupcake of cupCakes) {
        console.log(cupcake)
        newCupCake = $(
            `<div data-cupcake-id=${cupcake.id}>
                <img src="${cupcake.image}" alt="A delectable treat">
                <ul>
                    <li>Flavor:${cupcake.flavor}</li>
                    <li>Size:${cupcake.size}</li>
                    <li>Rating:${cupcake.rating}</li>
                    <button class="delete-button">X</button>
                </ul>
            </div>`
        )
        $("#cupcakes-list").append(newCupCake)
    }
}


$('.cupcake-btn').on('submit', async function (evt) {
    // evt.preventDefault()
    let flavor = $('.flavor').val()
    let size = $('.size').val()
    let rating = $('.rating').val()
    let image = $('.image').val()

    let res = await axios.post('/api/cupcakes', {
        flavor,
        size,
        rating,
        image
    })
    console.log(res)
    $("#cupcake-form").trigger("reset")
})

$("#cupcakes-list").on("click", ".delete-button", async function (evt) {
    evt.preventDefault();
    let $cupcake = $(evt.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");

    await axios.delete(`/api/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});