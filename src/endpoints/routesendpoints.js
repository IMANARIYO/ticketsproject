import express from "express";
import {
  createRoute,
  getAllRoutes,
  updateRoute,
  getRouteById,
  deleteRoute,
  deleteAllRoutes,
} from "../controllers/index.js";

const RouteRouter = express.Router();
RouteRouter.post("/createRoute", createRoute);
RouteRouter.get("/getAllRoutes", getAllRoutes);
RouteRouter.get("/findRoute/:id", getRouteById);
RouteRouter.patch("/updateRoute/:id", updateRoute);
RouteRouter.delete("/deleteRoute/:id", deleteRoute);
RouteRouter.delete("/deleteAllRoutes", deleteAllRoutes);

export default RouteRouter;
