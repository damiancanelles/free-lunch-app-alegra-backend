import app from "../..";

import request from "supertest"

describe("GET /ingredients", () => {
    it("return status 200", async () => {
        const res = await request(app).get("/api/ingredients/")
        expect(res.statusCode).toEqual(200)
    })
})