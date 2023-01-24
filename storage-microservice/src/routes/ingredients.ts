import express from "express";
import { Ingredients } from "../models/ingredients";

const router = express.Router()

router.get("/", async (_req, res) => {
    const recipes = await Ingredients.find()
    res.json(recipes).status(200)
})

export default router