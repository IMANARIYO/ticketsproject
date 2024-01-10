import authRouter from "./usersRouter.js"
import CarRouter from "./carsendpoints.js";
import TravelAgencyRouter from "./travelagencyendpoints.js";
import directionRouter from"./directionsendpoint.js"
import RouteRouter from "./routesendpoints.js";
import JourneyRouter from "./journeyendpoints.js";
import express from"express"
const mainRouter=express.Router();
     mainRouter.use(express.json());
     mainRouter.use("/auth",authRouter)
     mainRouter.use("/directions",directionRouter)
     mainRouter.use("/car",CarRouter)
     mainRouter.use("/TravelAgency",TravelAgencyRouter)
     mainRouter.use("/route",RouteRouter)
     mainRouter.use("/journey",JourneyRouter)
export default mainRouter;