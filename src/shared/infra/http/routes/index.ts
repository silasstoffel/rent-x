import {Router} from "express";
import {categoriesRoutes} from "./categories.routes";
import {speficationsRoutes} from "./specifications.routes";
import {usersRoutes} from "./users.routes";
import {authenticateRoutes} from "./authenticate.routes";
import {carsRoutes} from "./cars.routes";
import {rentalsRoutes} from "@shared/infra/http/routes/rentals.routes";
import {passwordRoutes} from "@shared/infra/http/routes/password.routes";

const router = Router();

const routers = [
    {path: "/sessions", action: authenticateRoutes},
    {path: "/categories", action: categoriesRoutes},
    {path: "/specifications", action: speficationsRoutes},
    {path: "/users", action: usersRoutes},
    {path: "/cars", action: carsRoutes},
    {path: "/rentals", action: rentalsRoutes},
    {path: "/password", action: passwordRoutes},
];

for (const route of routers) {
    router.use(route.path, route.action);
}

export {router};
