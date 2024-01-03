import authRouter from "./usersRouter.js"
import TravelAgencyRouter from "./travelagencyendpoints.js";
import TicketRouter from "./ticketsendpoints.js";
import CarRouter from "./carsendpoints.js";
import RouteRouter from "./routesendpoints.js";
import JourneyRouter from "./journeysEndsPoints.js";
import authorRouter from "./authersendpoints.js";
import bookRouter from "./bookendpoints.js";
import express from"express"
const mainRouter=express.Router();
     mainRouter.use(express.json());
     mainRouter.use("/auth",authRouter)
     mainRouter.use("/car",CarRouter)
     mainRouter.use("/travel-agencies",TravelAgencyRouter)
     mainRouter.use("/ticket",TicketRouter)
     mainRouter.use("/routes",RouteRouter)
    mainRouter.use("/journey",JourneyRouter)
    mainRouter.use("/author", authorRouter); 
mainRouter.use("/book", bookRouter);
export default mainRouter;