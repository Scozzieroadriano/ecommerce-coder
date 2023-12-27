import { Schema, model } from "mongoose";

export const usersCollectionName = "users";

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    role: { type: String, default: 'user' },
});

export const UserModel = model(usersCollectionName, userSchema);