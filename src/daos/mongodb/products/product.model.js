import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export const ProductsCollectionName = "products";

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    thumbnails: {
        type: String,
    },
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = model(ProductsCollectionName, productSchema);