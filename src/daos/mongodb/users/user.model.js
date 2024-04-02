import { Schema, model } from "mongoose";

export const usersCollectionName = "users";

const documentSchema = new Schema({
  name: { type: String, required: true },
  reference: { type: String, required: true }
});

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true, default: 0 },
  cart: { type: Schema.Types.ObjectId, ref: 'carts' },
  role: { type: String, default: 'user' },
  last_connection: { type: Date, default: Date.now },
  documents: [documentSchema] 
});

userSchema.pre('find', function () {
  this.populate('cart');
});

export const UserModel = model(usersCollectionName, userSchema);
