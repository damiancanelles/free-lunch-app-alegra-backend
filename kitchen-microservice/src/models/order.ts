import { Schema, model, models } from 'mongoose';
import { OrderI } from '../interfaces/order';

const orderSchema = new Schema<OrderI>({
    created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: [true, 'status is required'],
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    recipe: {
        type: Schema.Types.ObjectId,
        ref: "Recipe"
    }
});

export const Order = models.Order || model<OrderI>('Order', orderSchema);