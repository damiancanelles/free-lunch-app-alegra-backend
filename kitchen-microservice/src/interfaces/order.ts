import { Types } from "mongoose";

export interface OrderI {
    created_date?: Date;
    recipe: Types.ObjectId;
    status: 'pending' | 'completed';
}