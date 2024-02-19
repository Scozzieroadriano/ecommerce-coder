import Services from "../class.services.js";
import persistence from "../../persistence/persistence.js";
import { generateProducts } from "../../utils/mocks.utils.js";
const { productDao } = persistence;

export default class ProductService extends Services {
    constructor() {
        super(productDao)
        this.productsmocks = []
    }

    async createProductsMock(cant) {
      try {
        for (let i = 0; i < cant; i++) {
            const product = generateProducts();
            this.productsmocks.push(product)
        }
        return this.productsmocks
      } catch (error) {
        throw error;
      }
    }

    async getProductsMock() {
        try {
            return this.productsmocks;
            
        } catch (error) {
          throw error;
        }
    }

    async createProduct(data,user){
      try {
        const newData  = {...data}
        const owner = user.role === "premium" ? user.email : "admin"; 
        newData.owner = owner
        return await this.dao.create(newData)
      } catch (error) {
        throw error;
      }
    }
}