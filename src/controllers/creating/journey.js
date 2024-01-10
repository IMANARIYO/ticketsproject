import {Booking,direction,Journey,Car } from "../../models/index.js";

 import { finddirection,findCarr } from "./passingid.js";
import { catchAsync } from "../../middlewares/globaleerorshandling.js";

const createDynamic = (model) => {
  return catchAsync(async (req, res, next) => {
    try {
       let directiondata= await direction.findById(req.body.directionId)
       let cardata= await Car.findById(req.body.carId)
        let newObject = { ...req.body}
   newObject.TravelAgencyId=directiondata.TravelAgencyId
   newObject.carId=directiondata.carId
   newObject.RouteId=directiondata.RouteId
   newObject.travelAgenceName=cardata.travelAgencyName
   newObject.plannedSeats=cardata.equipedseats
   newObject.departureCity=directiondata.departureCity
   newObject.destinationCity=directiondata.destinationCity
const numberOfTicketsToMove = cardata.equipedseats;
  const ticketsToMove = directiondata.payedticketsbooked.slice(0, numberOfTicketsToMove);
  const updateQuery = {
    $pull: { 'payedticketsbooked': { $in: ticketsToMove } }
  };
  const updateddirection = await direction.findByIdAndUpdate(req.params.directionId, updateQuery, { new: true });
  if (updateddirection) {
    await updateddirection.save();
  }
  newObject.payedticketsbooked = ticketsToMove; 
 newObject.payedSeats=newObject.payedticketsbooked.length;
 newObject.nonPayedSeats=newObject.plannedSeats-newObject.payedSeats;
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
const createJourney = createDynamic(Journey);

export { createJourney };
