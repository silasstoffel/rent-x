import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { speficationsRoutes } from "./specifications.routes";

const router = Router();

const routers = [
  { path: "/categories", action: categoriesRoutes },
  { path: "/specifications", action: speficationsRoutes },
];

for (const route of routers) {
  router.use(route.path, route.action);
}

export { router };
