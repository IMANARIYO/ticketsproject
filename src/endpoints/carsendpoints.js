import express from "express";
import {
   deleteAllCars,
 getAllCars,
  updateCar,
  deleteCar,
  getCarById,
} from "../controllers/index.js";
import { uploaded } from "../utils/multer.js";
import { createCar } from "../controllers/creating/generalcreating.js";
const CarRouter = express.Router();
CarRouter.post("/insertCar",uploaded, createCar);
CarRouter.get("/getAllCars", getAllCars);
CarRouter.get("/findCar/:id", getCarById);
CarRouter.put("/updateCar/:id",uploaded,updateCar);
CarRouter.delete("/deleteCar/:id", deleteCar);
CarRouter.delete("/deleteAllCars", deleteAllCars);
export default CarRouter;
