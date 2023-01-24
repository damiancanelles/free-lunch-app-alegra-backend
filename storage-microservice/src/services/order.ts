import { IngredientI } from "../interfaces/ingredient"
import { Ingredients } from "../models/ingredients"
import axios from "axios"

const buyIngredient = async (ingredient: string) =>  {
    const response = await axios.get("https://recruitment.alegra.com/api/farmers-market/buy", { params: { ingredient: ingredient } })
    return response.data.quantitySold
}

const buyIngredientAmount = async (ingredient: string, amount: number) => {
    const totalBrought = await buyIngredient(ingredient)
    const currentIngredient = await Ingredients.findOne({
        "name": ingredient
    })
    currentIngredient.amount += totalBrought
    await currentIngredient.save()
    if (totalBrought < amount) {
        buyIngredientAmount(ingredient,amount - totalBrought)
    }
}

export const checkAvailability = async (ingredients: Array<IngredientI>) => {
    let availability = true
    await Promise.all(ingredients.map(async (ingredient) => {
        const currentIngredient = await Ingredients.findOne({
            "name": ingredient.name
        })
        if (currentIngredient.amount < ingredient.amount) {
            availability = false
        }
    }))
    return availability
}

export const takeIngredients = async (ingredients: Array<IngredientI>) => {
    await Promise.all(ingredients.map(async (ingredient) => {
        const currentIngredient = await Ingredients.findOne({
            "name": ingredient.name
        })
        currentIngredient.amount -= ingredient.amount
        currentIngredient.save()
    }))
}

export const buyIngredients = async (ingredients: Array<IngredientI>) => {
    await Promise.all(ingredients.map(async (ingredient) => {
        const currentIngredient = await Ingredients.findOne({
            "name": ingredient.name
        })
        const amount = currentIngredient.amount - ingredient.amount
        await buyIngredientAmount(ingredient.name,amount)
    }))
}