import express from "express";
import {
  deleteAllTravelAgencies,
  getAllTravelAgencies,
  updateTravelAgency,
  deleteTravelAgency,
  getTravelAgencyById,createTravelAgency
} from "../controllers/index.js";
import { uploaded } from "../utils/multer.js";
const TravelAgencyRouter = express.Router();
TravelAgencyRouter.post("/insertTravelAgency",uploaded, createTravelAgency);
TravelAgencyRouter.get("/getAllTravelAgencies", getAllTravelAgencies);
TravelAgencyRouter.get("/findTravelAgency/:id", getTravelAgencyById);
TravelAgencyRouter.put("/updateTravelAgency/:id", updateTravelAgency);
TravelAgencyRouter.delete("/deleteTravelAgency/:id", deleteTravelAgency);
TravelAgencyRouter.delete("/deleteAllTravelAgencies", deleteAllTravelAgencies);

export default TravelAgencyRouter;
