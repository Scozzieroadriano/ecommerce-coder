export const info = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: "Ecommerce API - CoderHouse",
            version: "1.0.0",
            description: "Backend para e-commerce desarrollado junto con coderhouse, cuenta con login,carrito de compras, crud de productos, orden de compra, entre otras cosas.",
        },
        servers:[
            {
                url: "http://localhost:8080",
                description: "Development server"
            },
            {
                url: "https://ecommerce-api.herokuapp.com",
                description: "Production server"
            }
        ]
    },
    apis: ["./src/docs/*.yml"],
};