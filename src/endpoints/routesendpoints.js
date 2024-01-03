import express from "express";
import {
  insertRoute,
  getAllRoutes,
  updateRoute,
  findRoute,
  deleteRoute,
  deleteAllRoutes,
} from "../controllers/index.js";

const RouteRouter = express.Router();

// Create a new route
RouteRouter.post("/createRoute", insertRoute);

// Get all routes
RouteRouter.get("/getAllRoutes", getAllRoutes);

// Get a specific route by ID
RouteRouter.get("/findRoute/:id", findRoute);

// Update a specific route by ID
RouteRouter.patch("/updateRoute/:id", updateRoute);

// Delete a specific route by ID
RouteRouter.delete("/deleteRoute/:id", deleteRoute);

// Delete all routes (use with caution)
RouteRouter.delete("/deleteAllRoutes", deleteAllRoutes);

export default RouteRouter;
