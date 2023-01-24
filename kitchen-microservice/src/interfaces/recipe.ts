import { IngredientI } from "./ingredient";

export interface RecipeI {
    name: string;
    ingredients?: Array<IngredientI>
}