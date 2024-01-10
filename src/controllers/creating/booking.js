import {Booking,direction } from "../../models/index.js";
 import { findRoutesByCities,
  findJourneyByCities,
  findDirectionsByCities,}from"../doublecitiesfinding.js"
 import { finddirection } from "./passingid.js";
import { catchAsync } from "../../middlewares/globaleerorshandling.js";

const createDynamic = (model) => {
  return catchAsync(async (req, res, next) => {
    try {
        let direction=findDirectionsByCities
        let newObject = { ...req.body}
        newObject.travelAgencyId=direction.travelAgencyId,
        newObject.departureCity=direction.departureCity,
        newObject.destinationCity=direction.destinationCity;
        direction.bookings.push(newObject._id);
        console.log("the new object id",newObject._id)
        await direction.save()
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
const createBooking = catchAsync(createDynamic(Booking));
export { createBooking };
