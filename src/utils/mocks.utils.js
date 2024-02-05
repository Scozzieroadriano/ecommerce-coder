import { fakerES as faker } from '@faker-js/faker'

export const generateProcuts = () =>{
    return {
        
        title : faker.commerce.productName(),
        description : faker.commerce.productDescription(),
        code : faker.string.uuid(),
        price : faker.commerce.price(),
        status : faker.datatype.boolean(),
        stock : faker.number.int(),
        category : faker.commerce.department(),
        thumbnails : faker.image.url()    
    }  
}
console.log(generateProcuts());