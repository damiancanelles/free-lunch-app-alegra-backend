import { Order } from "../models/order"

export const completeOrder = async (external_id: String) => {
    const order = await Order.findById(external_id)
    order.status = "completed"
    order.save()
}