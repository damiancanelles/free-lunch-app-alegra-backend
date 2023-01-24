import app from "../..";

import request from "supertest"

describe("GET /recipes", () => {
    it("return status 200", async () => {
        const res = await request(app).get("/api/recipes/")
        expect(res.statusCode).toEqual(200)
    })
})