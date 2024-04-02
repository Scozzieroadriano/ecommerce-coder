import multer from "multer";
import { __dirname } from "../utils/utils.js";

// Configuración de Multer para manejar diferentes carpetas según el tipo de archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = '';
    // Verifica el tipo de archivo y asigna la carpeta de destino adecuada
    if (file.fieldname === 'profileImage') {
      uploadPath = __dirname + './src/public/images/profiles/';
    } else if (file.fieldname === 'productImage') {
      uploadPath = __dirname + './src/public/images/products/';
    } else {
      uploadPath = __dirname + './src/public/images/documents/';
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Crea el middleware de Multer
export const uploader = multer({ storage: storage });
