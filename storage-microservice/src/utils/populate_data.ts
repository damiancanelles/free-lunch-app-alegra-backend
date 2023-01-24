import { ingredients } from "./seed_data/ingredients";
import { runDB } from "./mongoose";
import { Ingredients } from "../models/ingredients";

runDB()

ingredients.map(async (ingredient) => {
    await Ingredients.create({
        "amount": 5,
        "name": ingredient.name
    })
})