import { createdirection } from "../controllers/creating/direction.js";
import { getAlldirections } from "../controllers/gettingALL.js";
import express from"express"
const directionRouter=express.Router();
directionRouter.post("/createdirection/:TravelAgencyId",createdirection)
directionRouter.get("/getAlldirections",getAlldirections)
export default directionRouter;