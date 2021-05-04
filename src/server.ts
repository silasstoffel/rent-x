import express from "express";
import { categoriesRoutes } from "./routes/categories.routes";
import { speficationsRoutes } from './routes/specifications.routes';

const app = express();
app.use(express.json());

const routers = [
  { path: "/categories", action: categoriesRoutes },
  { path: "/specifications", action: speficationsRoutes },
];

for (const route of routers) {
  app.use(route.path, route.action);
}

app.listen(3333, () => console.log("Server is running :D"));
