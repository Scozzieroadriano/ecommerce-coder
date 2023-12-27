import Services from "./class.services.js";
import ProductMongoDao from "../daos/mongodb/products/product.dao.js";

export default class ProductService extends Services {
    constructor() {
        super(new ProductMongoDao());
    }
}