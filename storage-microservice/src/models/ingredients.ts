import { Schema, model, models } from 'mongoose';
import { IngredientI } from '../interfaces/ingredient';

const ingredientSchema = new Schema<IngredientI>({
    name: {
        type: String,
    },
    amount: {
        type: Number,
    }
});

export const Ingredients = models.Ingredients || model<IngredientI>('Ingredients', ingredientSchema);