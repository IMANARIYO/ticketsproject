
import { catchAsync } from "../../middlewares/globaleerorshandling.js";
import { carbooking } from "../specialfunctions.js";
import {
  Route,TravelAgency,Car,Ticket,Journey
   
  } from "../../models/index.js";
  import { datew } from "../../utils/datefunctin.js";
  import { findCar,findTicket,findJourney,findTravelAgency,findRoute } from "../findUsingId.js";
  
  
  const insertOneDynamic = model =>
   { 
      return async (req, res,next) =>
     {
  let newObject = { ...req.body};
  let journeydata= await Journey.findOne({_id:req.params.JOurneyID})
  let route=await Route.findOne({_id:journeydata.RouteId})
  let car=await Car.findOne({_id:journeydata.carId})

  newObject.JOurneyId=req.params.JOurneyID
  newObject.travelAgencyId=journeydata.TravelAgencyId        
  newObject.travelAgencename=journeydata.agenceName

  newObject.departureCity=route.departureCity
  newObject.destinationCity=route.destinationCity
  newObject.departureDateTime=journeydata.departureDateTime
  newObject.price=route.price
  newObject.seat_on_number=car.ticketsbooked.length + 1
         
           let thetimetoleft=journeydata.departureDateTime
           let theavailable=journeydata.availableSeats 
           let theremainingseats=car.remaingSeats;
           let ticketsbookedsize=car.ticketsbooked.length
            newObject.seat_on_number=car.ticketsbooked.length + 1
           let theticketrequestdate=datew
    if(theticketrequestdate>thetimetoleft){
        return res.status(409).json({message: `${model.modelName}  not created  because the time is--- ${theticketrequestdate} ----as the depature time of the journey you are trying tobookk tickets from is ----${thetimetoleft} ---passed over   `,
         });    
    }
if(car.ticketsbooked.length >=theavailable){
    return res.status(409).json({message: `${model.modelName}  not created  the tickets are finished  `,theremainingseatsis:theremainingseats-1,theavailableseatsis:theavailable
});    
}

let data = await model.create(newObject);
  let newticket= journeydata.ticketsbooked.push(data._id);
  let newticketincar=car.ticketsbooked.push(data._id);
  await journeydata.save();
  await car.save();
let available_tickets=car.availableSeats;
 let size=journeydata.ticketsbooked.length
  await journeydata.save();
journeydata.remainingseats=journeydata.availableSeats-journeydata.ticketsbooked.length;
await journeydata.save();
console.log("now in am from ticket function to report that  ----- the remaining tickets is",journeydata.remainingseats);
console.log("now in am from ticket function to report that  ----- the number of tickets booked is tickets is",journeydata.ticketsbooked.length);
console.log("now in am from ticket function to report that  ----- these booked tickets is",journeydata.ticketsbooked);



       data = await model.create(newObject);
        if (!data)
         {
            return res
            .status(404)
            .json({ message: `${model.modelName} failed to add` });
        }
        return res.status(200).json({message: `${model.modelName} created successfully`,
          data: data });
           next();
      }
   }

 export const insertticketsp = catchAsync(insertOneDynamic(Ticket));
 





  
