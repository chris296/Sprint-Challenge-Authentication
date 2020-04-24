const request = require("supertest");

const server = require("./server");
const db = require("../database/dbConfig");
describe("server", function () {
    describe("POST /register", function () {
        beforeEach(async () => {
            await db("users").truncate();
        });

        it("should return 201 on success", function () {
            return request(server)
            .post("/api/auth/register")
            .send({username: "chris", password: "abc"})
            .then(res => {
                expect(res.status).toBe(201);
            })
        })
        it("should return 500 on fail", function () {
            return request(server)
            .post("/api/auth/register")
            .send({username: "chris2"})
            .then(res => {
                expect(res.status).toBe(500);
            })
        })
    })

    describe("POST /login", function () {
        it("should return message on fail", function () {
            return request(server)
            .post("/api/auth/login")
            .send({username: "chris", password: "abc"})
            .then(res => {
                expect(res.body.message).toBe("you shall not pass");
            })
        })
        it("should return 401 on fail", function () {
            return request(server)
            .post("/api/auth/login")
            .send({username: "chris"})
            .then(res => {
                expect(res.status).toBe(401);
            })
        })
    })
})