import 'dotenv/config'
import express from 'express';
import { connectToMongo } from './config/conection.js';
import  ApiRoutes  from './routes/api.routes.js';
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import passport from 'passport';
import session from 'express-session';
import './passport/google.js';
import cookieParser from 'cookie-parser';
const apiRoutes = new ApiRoutes().getRouter()


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));
app.use(session({
  secret: 'tu secreto aquí',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(errorHandler);
app.use('/api', apiRoutes);

const persistence = process.env.PERSISTENCE;

if (persistence === 'MONGO') await connectToMongo();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
