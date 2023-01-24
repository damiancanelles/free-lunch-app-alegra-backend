import express from "express";
import { Recipe } from "../models/recipe";

const router = express.Router()

router.get("/", async (_req, res) => {
    const recipes = await Recipe.find()
    res.json(recipes).status(200)
})

export default router