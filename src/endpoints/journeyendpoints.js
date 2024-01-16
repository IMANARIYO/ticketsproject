import { createJourney } from "../controllers/creating/journey.js";
import { getAllJourneys } from "../controllers/gettingALL.js";
import { findJourneyByCities } from "../controllers/doublecitiesfinding.js";

import  express from "express";
const JourneyRouter = express.Router();
JourneyRouter.post("/createJourney",createJourney)
JourneyRouter.get("/getAllJourneys",getAllJourneys)
JourneyRouter.get("/findJourneyByCities", findJourneyByCities)
JourneyRouter.get("/getAllJourneys",getAllJourneys)
export default JourneyRouter