import { createdirection } from "../controllers/creating/direction.js";
import express from"express"
const directionRouter=express.Router();
directionRouter.post("/createdirection/:TravelAgencyId",createdirection)
export default directionRouter;