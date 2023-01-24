import app from "../..";

import request from "supertest"

describe("GET /orders", () => {
    it("return status 200", async () => {
        const res = await request(app).get("/api/orders/")
        expect(res.statusCode).toEqual(200)
    })
})

describe("GET /orders/create", () => {
    it("return status 200", async () => {
        const res = await request(app).get("/api/orders/create")
        expect(res.statusCode).toEqual(200)
    })
})