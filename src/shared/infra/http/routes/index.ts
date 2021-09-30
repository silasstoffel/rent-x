import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { speficationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";

const router = Router();

const routers = [
  { path: "/sessions", action: authenticateRoutes },
  { path: "/categories", action: categoriesRoutes },
  { path: "/specifications", action: speficationsRoutes },
  { path: "/users", action: usersRoutes },
];

for (const route of routers) {
  router.use(route.path, route.action);
}

export { router };
