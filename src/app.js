import 'dotenv/config'
import express from 'express';
import { connectToMongo } from './config/conection.js';
import  ApiRoutes  from './routes/api.routes.js';
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
const apiRoutes = new ApiRoutes().getRouter()


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));

app.use(errorHandler);
app.use('/api', apiRoutes);

const persistence = process.env.PERSISTENCE;

if (persistence === 'MONGO') await connectToMongo();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
