import express from "express";
import {
  deleteAllCars,
  getAllCars,
  updateCar,
  deleteCar,
  findCar,insertCar
} from "../controllers/index.js";

const CarRouter = express.Router();
CarRouter.post("/insertCar/:agenceId", insertCar);

// Get all cars
CarRouter.get("/getAllCars", getAllCars);

// Get a specific car by ID
CarRouter.get("/findCar/:id", findCar);

// Update a specific car by ID
CarRouter.put("/updateCar/:id", updateCar);

// Delete a specific car by ID
CarRouter.delete("/deleteCar/:id", deleteCar);

// Delete all cars (use with caution)
CarRouter.delete("/deleteAllCars", deleteAllCars);

export default CarRouter;
