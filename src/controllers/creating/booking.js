import {Booking,direction,TravelAgency,Route } from "../../models/index.js";
 import { findRoutesByCities, 
  findJourneyByCities,
  findDirectionsByCities,}from"../doublecitiesfinding.js"
 import { finddirection } from "./passingid.js";
import { catchAsync } from "../../middlewares/globaleerorshandling.js";

const createDynamic = (model) => {
  return (async (req, res, next) => {
    try {
      let newObject = { ...req.body}

      const { departureCity, destinationCity,TravelAgencyId } = req.body;
      let travelAgencedata=await TravelAgency.findById(TravelAgencyId)
      if (!travelAgencedata) {
        return res.status(404).json({
          message: `No TravelAgency  found for id ${TravelAgencyId} `,
        });
      }
      let directiondata=await direction.findOne({ departureCity, destinationCity,TravelAgencyId});
      if (!directiondata) {
        return res.status(404).json({
          message: `No direction found for departure city: ${departureCity} and destination city: ${destinationCity} in this travel agency called "${travelAgencedata.travelAgenceName}"`,
        });
      }
      newObject.directionId=directiondata._id
      let routedata= await Route.findById(directiondata.RouteId)
      if (!directiondata) {
        return res.status(404).json({
          message: `No ${model.modelName} found for departure city: ${departureCity} and destination city: ${destinationCity} int this travel agence called"  ${travelAgencedata.travelAgenceName}  "`,
        });
      }
     
      let bookingDate=req.body.bookingDate;
      let bookingTime=bookingDate +"T"+ req.body.bookingTime
      

      let currentdate= Date.now();
      let datetogo=new Date(Date.parse(bookingDate)).getDate()
      let timetogo=Date.parse(bookingTime)

      if((Date.parse(bookingTime))<currentdate){
        return res.status(409).json({
        message: `you can not  cretate ${model.modelName} in past.beacause  the current date is ${currentdate} while  the wished time is${Date.parse(bookingDate)} it should be greater`,
      });
      }
      let desicioningdate =new Date(Date.now()).getDate()
     
    if(desicioningdate===datetogo){
      console.log("-----youare addwed on the waitng time  list -------")
       newObject.waitingTime=true
    }
        newObject.price=routedata.price
        newObject.travelAgencyId=directiondata.TravelAgencyId,
        newObject.departureCity=directiondata.departureCity,
        newObject.destinationCity=directiondata.destinationCity;
      
        let data= await model.create(newObject);

         directiondata.bookedDate.push(newObject.bookingDate)
         directiondata.bookedTime.push(newObject.bookingTime)
         directiondata.ticketsbooked.push(data._id)
         directiondata.nonpayedbookedtickets.push(data._id)
         directiondata.bookings.push(data._id)
         await directiondata.save()
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
