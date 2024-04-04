# Backend de Aplicación E-commerce

Este repositorio contiene el backend de una aplicación de e-commerce desarrollada en Node.js con express, mongoose, conectada a MongoDB. Utiliza type Modules. Se trata de una API para gestionar usuarios y productos, llevar a cabo una compra mediante carritos y tickets de compra. Utiliza swagger para documentar a fondo cada funcionalidad.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` para instalar todas las dependencias.

## Uso

Antes de comenzar, asegúrate de configurar el entorno adecuadamente.

### Iniciar el servidor

Para iniciar el servidor, ejecuta el siguiente comando:

npm start

### Endpoints

#### Productos

- **POST /api/products/:** Crea un nuevo producto si el rol del usuario es premium.
- **GET /api/products/:** Lista todos los productos.
- **GET /api/products/{id}:** Busca un producto por ID.
- **PUT /api/products/{id}:** Modificar un producto por ID
- **DELETE /api/products/{id}:** Borra un producto por ID. Los usuarios con rol de administrador pueden borrar cualquier producto, y se envía un correo electrónico al creador del producto. Los usuarios premium solo pueden borrar sus propios productos.

#### Carritos

- **POST /api/carts/:** Crea un carrito. Se crea cuando el usuario se registra.
- **GET /api/carts/:** Obtiene todos los carritos. Solo Admins
- **GET /api/carts/{id}:** Busca un carrito por ID. filtra carrito por usuario, es decir un usuario puede ver su propio carrito.
- **DELETE /api/carts/{id}:** Borra un carrito por ID
- **POST /api/carts/{idCart}/products/{idProd}:** Agrega un producto al carrito.
- **PUT /api/carts/{idCart}/products/{idProd}:** Modifica la cantidad de un producto en el carrito.
- **DELETE /api/carts/{idCart}/products/{idProd}:** Elimina un producto del carrito.
- **DELETE /api/tickets/{cartId}:** Vacía el carrito.

#### Usuarios

- **GET /api/users/:** Lista todos los usuarios. Solo los usuarios con rol de administrador pueden usar este endpoint.
- **POST /api/users/register:** Registra un usuario nuevo.
- **POST /api/users/login:** Inicia sesión del usuario y actualiza la fecha de conexión.
- **GET /api/users/profile-cookie:** Accede al perfil del usuario.
- **DELETE /api/users/delete:** Borra los usuarios que tengan más de 10 dias de inactividad. Solo admins.

## Configuración extra

Antes de ejecutar la aplicación, asegúrate de configurar las  variables de entorno:
REVISAR ARCHIVO .envTest
                                        **IMPORTANT**
**Cuando accedan al link de swagger cambiar de servidor, ya que existen dos, developer y produccion.**

## Documentación

La documentación de la API está disponible en Swagger. Puedes acceder a ella visitando la ruta `/docs` cuando el servidor esté en funcionamiento. O a través del siguiente [link](https://ecommerce-coder-sdwk.onrender.com/docs/).


```bash