import { Recipe } from "../models/recipe";
import { connectMongoDB } from "./mongoose";
import { recipes } from "./seed_data/recipes";

connectMongoDB()

recipes.map((recipe) => {
    Recipe.create({
        "name": recipe.name,
        "ingredients": recipe.ingredients
    })
})