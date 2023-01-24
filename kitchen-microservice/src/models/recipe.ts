import { Schema, model, models } from 'mongoose';
import { RecipeI } from '../interfaces/recipe';

const recipeSchema = new Schema<RecipeI>({
    name: {
        type: String,
        unique: true,
        required: [true, 'name is required'] 
    },
    ingredients: [{
        type: Object,
        default: []
    }]
});

export const Recipe = models.Recipe || model<RecipeI>('Recipe', recipeSchema);