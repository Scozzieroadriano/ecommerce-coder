import { Schema, model } from "mongoose";

export const usersCollectionName = "users";

const userSchema = new Schema({
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true, default: 0 },
    cart: { type: Schema.Types.ObjectId, ref: 'carts'},
    role: { type: String, default: 'user' },
});

userSchema.pre('find', function () {
    this.populate('cart'); 
  });

export const UserModel = model(usersCollectionName, userSchema);