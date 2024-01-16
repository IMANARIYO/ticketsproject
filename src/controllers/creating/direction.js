import {Booking,direction,Route,TravelAgency } from "../../models/index.js";
 import { findRoutesByCities,
  findJourneyByCities,
  findDirectionsByCities,}from"../doublecitiesfinding.js"
 import { findRoutee,findTravelAgencyy } from "./passingid.js";
import { catchAsync } from "../../middlewares/globaleerorshandling.js";

const createDynamic = (model) => {
  return catchAsync(async (req, res, next) => {
    try {
       let RouteId=req.body.RouteId;
       let TravelAgencyId=req.params.TravelAgencyId
        let newObject = { ...req.body}
let Routedata=  await Route.findById(RouteId)

let TravelAgencydata=await TravelAgency.findById(TravelAgencyId);
newObject.price=Routedata.price
newObject.departureCity=Routedata.departureCity
newObject.destinationCity=Routedata.destinationCity
newObject.RouteId=RouteId
newObject.TravelAgencyId=TravelAgencyId
newObject.directionName=Routedata.routeName
TravelAgencydata.routes.push(RouteId)

await TravelAgencydata.save()
Routedata.travelagencies.push(TravelAgencyId)
await Routedata.save();
        let data = await model.create(newObject);
        if (!data)
        {
           return res
           .status(404)
           .json({ message: `${model.modelName} failed to add` });
       }
      res.status(201).json({
        message: `Document created successfully in ${model.modelName} collection.`,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  });
};
const createdirection = createDynamic(direction);

export { createdirection };
