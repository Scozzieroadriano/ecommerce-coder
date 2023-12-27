import { Schema, model } from "mongoose";

export const cartsCollectionName = "carts";

const cartProductSchema = new Schema({
  _id: false,
  product: { type: Schema.Types.ObjectId, ref: 'products' },
  quantity: { type: Number, default: 1 }
});

const cartSchema = new Schema({
  products:[cartProductSchema]
});

cartSchema.pre('find', function () {
  this.populate('products.product'); 
});

cartSchema.pre('findOne', function () {
  this.populate('products.product'); 
});


export const CartModel = model(cartsCollectionName, cartSchema);
