import { createJourney } from "../controllers/creating/journey.js";
import  express from "express";
const JourneyRouter = express.Router();
JourneyRouter.post("/createJourney",createJourney)
export default JourneyRouter