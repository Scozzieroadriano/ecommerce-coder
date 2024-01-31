import { Schema, model } from "mongoose";

export const TicketCollectionName = "tickets";

export const ticketSchema = new Schema({
    code: { type: String, required: true},
    purchase_datetime: { type: String, required: true},
    amount : { type: String, required: true},
    puchaser: { type: String, required: true}
})

export const TicketModel = model(TicketCollectionName, ticketSchema);