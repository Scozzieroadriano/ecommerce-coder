import express from "express";
import apiRoutes from "./routes/index.routes.js";
import viewsRoutes from "./routes/views.routes.js";
const app = express();
const PORT = 8080;

app.use('/api', apiRoutes);
app.use('/', viewsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
