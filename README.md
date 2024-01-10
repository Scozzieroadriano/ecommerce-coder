# Ecommerce-Coder Backend

Este es el backend de un proyecto de ecommerce-coder desarrollado con Node.js, Express, Passport Google, JWT, Mongoose, Cookie-parser, y Bcrypt. La aplicación sigue una arquitectura de capas con DAOs, servicios, controladores y rutas, utilizando clases y herencias.

## Requisitos

Asegúrate de tener instalado Node.js y npm en tu máquina antes de comenzar.

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/Scozzieroadriano/ecommerce-coder

cd ecommerce-coder-backend

npm install

npm run dev

```
CONFIGURA LAS VARIABLES DE ENTORNO ANTES DE INICIAR
## Uso

Puedes realizar las siguientes operaciones con la API:

### Para autenticarse con Google, accede a la siguiente ruta:

http://localhost:8080/api/users/oauth2/redirect/accounts.google.com

- Esta ruta se utiliza tanto para el registro como para el inicio de sesión. Generará un token de autenticación y lo almacenará en una cookie. Si el token es validado por el middleware, la aplicación redireccionará a:

http://localhost:8080/api/session/current

Mostrando los datos del usuario. En caso de error de autorización, se mostrará un mensaje de error.

- Para cerrar sesión y eliminar la cookie, accede a la siguiente ruta:

http://localhost:8080/api/session/logout

### Productos

#### Obtener productos

- Ruta: `GET api/products`
- Descripción: Obtén una lista de todos los productos. Puedes utilizar el parámetro de consulta `limit` para limitar la cantidad de productos que se muestran. (limit en desarrollo)
- Ejemplo: `http://localhost:8080/api/products` para obtener todos los productos o `http://localhost:8080/api/products?limit=5` para obtener solo 5 productos.

#### Obtener un producto específico

- Ruta: `GET http://localhost:8080/api/products/:productId`
- Descripción: Obtén los detalles de un producto específico proporcionando su ID.
- Ejemplo: `http://localhost:8080/api/products/2` para obtener los detalles del producto con ID 2.

#### Crear un producto

- Ruta: `POST http://localhost:8080/api/products`
- Descripción: Crea un producto específico proporcionando su información correcta.
- Ejemplo: `http://localhost:8080/api/products` para crear un producto con lasiguiente informacion.
        {
            "title": "Producto de prueba Luis",
            "description": "Este es un producto de prueba",
            "code": "123956",
            "price": 99.99,
            "status": true,
            "stock": 10,
            "category": "Prueba",
            "thumbnails": ""
        }
##### Actualizar un producto

- Ruta: `POST http://localhost:8080/api/products/:productId`
- Descripción: Actualiza un producto específico proporcionando su id y la información a cambiar.
- Ejemplo: `http://localhost:8080/api/products/64e57ca8d86d4ba4e6a38d1f` para actualizar un producto con lasiguiente informacion.
        {
        "title": "Cambiado por luis3"
        } 

#### ELIMINAR UN PRODUCTO  
- Ruta: `DELETE http://localhost:8080/api/products/:productId`
- Descripción: Elimina un producto específico proporcionando su id.
- Ejemplo: `http://localhost:8080/api/products/64e57ca8d86d4ba4e6a38d1f` para eliminar un producto.


### Carritos

#### Crear un carrito nuevo

- Ruta: `POST api/carts`
- Descripción: Crea un nuevo carrito y devuelve su información, incluyendo un ID único.

#### Agregar productos a un carrito

- Ruta: `POST api/carts/:cartId/products/:productId`
- Descripción: Agrega un producto a un carrito específico. Proporciona el ID del carrito y el ID del producto en la URL.

#### Obtener detalles de un carrito

- Ruta: `GET api/carts/:cartId`
- Descripción: Obtiene los detalles de un carrito específico proporcionando su ID.

#### Obtener detalles de todos los carritos

- Ruta: `GET api/carts/`
- Descripción: Obtiene los detalles de todos los carritos creados.

##### Eliminar producto 

- Ruta: `DELETE api/carts/:cid/products/:idprod`
- Descripción: Elimina el producto seleccionado del carrito

#### Actualizar carrito

- Ruta: `PUT api/carts/:cid`
- Descripción: Actualiza el carrito con el array deseado, debe tener el mismo formato que el modelo en mongoose.

#### Actualizar cantidad de producto

- Ruta: `PUT api/carts/:cid/products/:idprod`
- Descripción: Solo actualizara la cantidad de un producto seleccionado que se encuentre en el carrito,
con la cantidad que ingrese por body

#### Borrar todos los productos

- Ruta: `DELETE api/carts/:cid`
- Descripción: Elimina todos los productos dentro del carrito, deja un array vacio en el carrito seleccionado

#### Borrar carrito
- Ruta: `DELETE api/carts/:cid`
- Descripción: Elimina el carrito seleccionado