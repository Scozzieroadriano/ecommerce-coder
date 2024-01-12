import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";
const { productDao } = persistence;

export default class ProductService extends Services {
    constructor() {
        super(productDao)
    }
}