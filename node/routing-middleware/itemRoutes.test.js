process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let candy = {
    "name": "Mr.Goodbar",
    "price": 2.69
}
let chips = {
    "name": "cheetos",
    "price": 3.50
}

beforeEach(function () {
    items.push(candy);
    items.push(chips);
});

afterEach(function () {
    // make sure this *mutates*, not redefines, `cats`
    items.length = 0;
})

describe("GET /items", function () {
    test("GET all items", async function () {
        const resp = await request(app).get('/items')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual([{
            "name": "Mr.Goodbar",
            "price": 2.69
        },
        {
            "name": "cheetos",
            "price": 3.50
        }])
    })

    test("GET a single item", async function () {
        const resp = await request(app).get(`/items/${candy.name}`)
        console.log(items)
        console.log(candy.name)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual([{
            "name": "Mr.Goodbar",
            "price": 2.69
        }])
    })

    test("throw Error", async function () {
        const resp = await request(app).get("/items/goobers")
        expect(resp.statusCode).toBe(400)

    })
})

describe("POST /items", function () {
    test('make an item', async function () {
        const resp = await request(app)
            .post('/items')
            .send({
                "name": "skittles",
                "price": 2.69
            })
        expect(resp.statusCode).toBe(201)
        expect(resp.body).toEqual({
            'Added!': {
                "name": "skittles",
                "price": 2.69
            }
        })
    })

})

describe("PATCH /items", function () {
    test("update candy", async function () {

        const resp = await request(app)
            .patch(`/items/${candy.name}`)
            .send({
                "name": "Milkyway",
                "price": 3.29
            })
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({
            'Updated': {
                "name": "Milkyway",
                "price": 3.29
            }
        })
    })

    test("throw Error", async function () {
        const resp = await request(app).patch("/items/goobers")
        expect(resp.statusCode).toBe(400)

    })
})

describe("DELETE items", function () {
    test("delete chips", async function () {
        const resp = await request(app).delete(`/items/${chips.name}`)

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    })

    test("throw Error", async function () {
        const resp = await request(app).patch("/items/goobers")
        expect(resp.statusCode).toBe(400)

    })
})