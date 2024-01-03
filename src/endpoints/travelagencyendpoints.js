import express from "express";
import {
  deleteAllTravelAgencies,
  getAllTravelAgencies,
  updateTravelAgency,
  deleteTravelAgency,
  findTravelAgency,insertTravelAgency
} from "../controllers/index.js";

const TravelAgencyRouter = express.Router();
TravelAgencyRouter.post("/insertTravelAgency", insertTravelAgency);

// Get all travel agencies

TravelAgencyRouter.get("/getAllTravelAgencies", getAllTravelAgencies);

// Get a specific travel agency by ID
TravelAgencyRouter.get("/findTravelAgency/:id", findTravelAgency);

// Update a specific travel agency by ID
TravelAgencyRouter.put("/updateTravelAgency/:id", updateTravelAgency);

// Delete a specific travel agency by ID
TravelAgencyRouter.delete("/deleteTravelAgency/:id", deleteTravelAgency);

// Delete all travel agencies (use with caution)
TravelAgencyRouter.delete("/deleteAllTravelAgencies", deleteAllTravelAgencies);

export default TravelAgencyRouter;
