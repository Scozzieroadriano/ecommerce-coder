import Controller from "./class.controller.js";
import ProductServices from "../services/product.services.js";

export default class ProductController extends Controller {
    constructor() {
        super(new ProductServices());
    }
    
}