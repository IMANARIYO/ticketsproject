import express from "express";
import {
  insertJourney,
  deleteAllJourneys,
  getAllJourneys,
  updateJourney,
  deleteJourney,
  findJourney,
} from "../controllers/index.js";

const JourneyRouter = express.Router();

// Create a new journey
JourneyRouter.post("/createJourney/:routeId/:carId", insertJourney);

// Get all journeys
JourneyRouter.get("/getAllJourneys", getAllJourneys);

// Get a specific journey by ID
JourneyRouter.get("/findJourney/:id", findJourney);

// Update a specific journey by ID
JourneyRouter.patch("/updateJourney/:id", updateJourney);

// Delete a specific journey by ID
JourneyRouter.delete("/deleteJourney/:id", deleteJourney);

// Delete all journeys (use with caution)
JourneyRouter.delete("/deleteAllJourneys", deleteAllJourneys);

export default JourneyRouter;
