process.env.NODE_ENV = 'test'

const app = require("./app")
const db = require("./db")
const request = require("supertest");
const Book = require("./models/book")


describe("books route(s) tests", function () {
    beforeEach(async function () {
        await db.query("DELETE FROM books")

        let book1 = await Book.create({
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew Lane",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            "year": 2017
        })
    })

    test("get all books", async function () {
        let resp = await request(app).get("/books")

        expect(resp.body).toEqual({
            books: [
                {
                    isbn: '0691161518',
                    amazon_url: 'http://a.co/eobPtX2',
                    author: 'Matthew Lane',
                    language: 'english',
                    pages: 264,
                    publisher: 'Princeton University Press',
                    title: 'Power-Up: Unlocking the Hidden Mathematics in Video Games',
                    year: 2017
                }
            ]
        })
        expect(resp.statusCode).toEqual(200)
    })

    test("get book by id", async function () {
        let resp = await request(app).get("/books/0691161518")
        expect(resp.statusCode).toEqual(200)
    })

    test("error book by id", async function () {
        let resp = await request(app).get("/books/38546513")

        expect(resp.statusCode).toEqual(404)

    })

    test("create book", async function () {
        let resp = await request(app)
            .post("/books")
            .send({
                "isbn": '5656',
                "amazon_url": 'http://a.co/eobPtX2',
                "author": 'bartolomeo',
                "language": 'english',
                "pages": 358,
                "publisher": 'LFC',
                "title": 'why you too should be following my captain',
                "year": 2014
            })
        expect(resp.statusCode).toEqual(201)
        expect(resp.body).toEqual({
            book: {
                isbn: '5656',
                amazon_url: 'http://a.co/eobPtX2',
                author: 'bartolomeo',
                language: 'english',
                pages: 358,
                publisher: 'LFC',
                title: 'why you too should be following my captain',
                year: 2014
            }
        })
    })
    test("create book error (isbn)", async function () {
        let resp = await request(app)
            .post("/books")
            .send({
                "amazon_url": 'http://a.co/eobPtX2',
                "author": 'bartolomeo',
                "language": 'english',
                "pages": 358,
                "publisher": 'LFC',
                "title": 'why you too should be following my captain',
                "year": 2014
            })
        expect(resp.statusCode).toEqual(400)
        expect(resp.body.error).toEqual({ message: ['instance requires property "isbn"'], status: 400 })

    })
    test("create book error (year is string)", async function () {
        let resp = await request(app)
            .post("/books")
            .send({
                "isbn": '5656',
                "amazon_url": 'http://a.co/eobPtX2',
                "author": 'bartolomeo',
                "language": 'english',
                "pages": 358,
                "publisher": 'LFC',
                "title": 'why you too should be following my captain',
                "year": 'twenty-fourteen'
            })
        expect(resp.statusCode).toEqual(400)
        expect(resp.body.error).toEqual({
            message: ['instance.year is not of a type(s) integer'],
            status: 400
        })


    })

    test("update book", async function () {
        let resp = await request(app)
            .put("/books/0691161518")
            .send({
                "amazon_url": "http://a.co/eobPtX2",
                "author": "dogman",
                "language": "spaniel",
                "pages": 25,
                "publisher": "dogman publishing",
                "title": "dont pee on my street corner... I'm watching..",
                "year": 2004
            })
        expect(resp.statusCode).toEqual(200)
        expect(resp.body).toEqual({
            book: {
                isbn: "0691161518",
                amazon_url: 'http://a.co/eobPtX2',
                author: 'dogman',
                language: 'spaniel',
                pages: 25,
                publisher: 'dogman publishing',
                title: "dont pee on my street corner... I'm watching..",
                year: 2004
            }
        })
    })
    test("update book error (id)", async function () {
        let resp = await request(app)
            .put("/books/5678423")
            .send({
                "amazon_url": "http://a.co/eobPtX2",
                "author": "dogman",
                "language": "spaniel",
                "pages": 25,
                "publisher": "dogman publishing",
                "title": "dont pee on my street corner... I'm watching..",
                "year": 2004
            })
        expect(resp.statusCode).toEqual(404)
        expect(resp.body.error).toEqual({ message: "There is no book with an isbn '5678423", status: 404 })

    })

    test("delete book", async function () {
        let resp = await request(app).delete("/books/0691161518")
        expect(resp.statusCode).toEqual(200)
        expect(resp.body).toEqual({ message: 'Book deleted' })
    })
    test("delete book error (id)", async function () {
        let resp = await request(app).delete("/books/0564981")
        expect(resp.statusCode).toEqual(404)
        expect(resp.body.error).toEqual({ message: "There is no book with an isbn '0564981", status: 404 })
    })

    afterAll(async function () {
        await db.end();
    });
})