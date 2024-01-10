import express from "express";
import {
   deleteAllCars,
 getAllCars,
  updateCar,
  deleteCar,
  getCarById,
} from "../controllers/index.js";
import { createCar } from "../controllers/creating/generalcreating.js";
const CarRouter = express.Router();
CarRouter.post("/insertCar", createCar);
CarRouter.get("/getAllCars", getAllCars);
CarRouter.get("/findCar/:id", getCarById);
CarRouter.put("/updateCar/:id", updateCar);
CarRouter.delete("/deleteCar/:id", deleteCar);
CarRouter.delete("/deleteAllCars", deleteAllCars);
export default CarRouter;
