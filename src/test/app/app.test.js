import app from "../../app.js";
import request from "supertest";
import mongoose from 'mongoose';
import { fakerES as faker } from "@faker-js/faker";

describe('Testing integrales Router Products', () => {
    let authToken;
    beforeAll(async () => {
        await mongoose.connection.collections["products"].drop();
        //SIMULO UN LOGIN DE USUARIO PARA PASAR LOS MIDDLEWARES
        const loginResponse = await request(app)
            .post('/api/users/login')
            .send({
                username: "adrianito",
                email: "adrianito@correo.com",
                password: "contraseña_segura"
            });
        authToken = loginResponse.body.token
        console.log('Login Exitoso Token:', authToken);
    });
    //PASO EL TOKEN EN EL SIGUIENTE REQUEST PARA CREAR UN PRODUCTO
    test('[POST] /api/products', async () => {
        const product = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.string.uuid(),
            price: faker.commerce.price(),
            status: faker.datatype.boolean(),
            stock: faker.number.int(),
            category: faker.commerce.department(),
            thumbnails: faker.image.url()
        };
        const response = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${authToken}`) // Agregar el token de autenticación en el encabezado
            .send(product);
            
        expect(response.body._id).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(product.title);
        expect(response.body.description).toBe(product.description);
        expect(response.body.code).toBe(product.code);
        expect(response.body.status).toBe(product.status);
        expect(response.body.stock).toBe(product.stock);
        expect(response.body.category).toBe(product.category);
        expect(response.body.thumbnails).toBe(product.thumbnails);
        
    });
    test('', () => { });
    test('', () => { });
    test('', () => { });
    test('', () => { });
    test('', () => { });
    test('', () => { });
})