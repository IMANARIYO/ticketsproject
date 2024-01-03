
import { catchAsync } from "../middlewares/globaleerorshandling.js";
import { carbooking } from "./specialfunctions.js";
import {
  Route,TravelAgency,Car,Ticket,Journey
   
  } from "../models/index.js";
  import { datew } from "../utils/datefunctin.js";
  import { findCar,findTicket,findJourney,findTravelAgency,findRoute } from "./findUsingId.js";
  
  import dotenv from "dotenv";
  import { v2 as cloudinary } from "cloudinary";
  dotenv.config();
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });
  const insertOneDynamic = model =>
   { 
      return async (req, res,next) =>
     {
      let data;
        let newObject = { ...req.body};
        if (req.files && req.files["image"])
         {
                  newObject.image = (await cloudinary.uploader.upload(
                    req.files["image"][0].path
                  )).secure_url;
        }
        if (req.files && req.files.gallery)
         {   console.log("in gallery")
             let imagesArray = [];
             for (let index = 0; index < req.files.gallery.length; index++)
              {imagesArray.push((await cloudinary.uploader.upload(req.files.gallery[index].path)) .secure_url); }
             newObject.gallery = imagesArray;
          }
          if(model == Car ){
let travelAgenceinfo=await TravelAgency.findOne({_id:req.params.agenceId})
newObject.agenceName=travelAgenceinfo.agencyName
newObject.TravelAgencyId=travelAgenceinfo._id
}
          if(model == Journey ){
            let carId=req.params.carId;
            let  routeId=req.params.routeId
           let car= await Car.findOne({ _id:carId});
          let route=await Route.findOne({ _id:routeId});
          let TravelAgencyId=car.TravelAgencyId
          let TravelAgencyInfo=await TravelAgency.findById(TravelAgencyId)
          newObject.agenceName=car.agenceName;
          newObject.RouteId=routeId;
          newObject.carId=carId;
          newObject.travelAgencyId=car.TravelAgencyId;
        newObject.agenceName=car.agenceName;
         car.status="booked",
         car.currentlyBookedfor=`${route.routeName} Route  on the departure time 0f ${newObject.departureDateTime} `
          console.log("be fore booking the car---------------------", car)
         car.ticketsbooked.length=0
         car.ticketsbooked.splice(0, car.ticketsbooked.length);
         while ( car.ticketsbooked.length > 0) {
          car.ticketsbooked.pop();                  
        }
        await car.save();
          newObject.remainingseats=car.availableSeats;
          newObject.availableSeats=car.availableSeats;
          const departureDateTime = new Date(newObject.departureDateTime);
const currentDate = new Date(datew);
          console.log("---------------------------newObject.departureDateTime-----------------------",newObject.departureDateTime,"-----",(newObject.departureDateTime<datew),"---------------",datew)
          if(departureDateTime<currentDate){
            return res.status(409).json({messages:`dear manger  you can not  make  the journey in the past   as now    we are at ${datew}  while  you are trying tom ake the journey  on ${newObject.departureDateTime}  so try again later`})
          }
          data = await model.create(newObject);

          TravelAgencyInfo.Journeys.push(data._id)
          TravelAgencyInfo.routes.push(route._id)
           await TravelAgencyInfo.save()
           
         
route.cars.push(car._id);
route.travelagencies.push(TravelAgencyId);
await route.save();
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
          if(model == Route){
            newObject.routeName=`${newObject.departureCity}-->${newObject.destinationCity}`
          }
        
         data = await model.create(newObject);
        if(model === Car){
          let travelAgenceinfo=await TravelAgency.findOne({_id:req.params.agenceId})
          travelAgenceinfo.cars.push(data._id)
          await travelAgenceinfo.save()
        }
  
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
 export const insertTicket = catchAsync(insertOneDynamic(Ticket));
 export const insertCar = catchAsync(insertOneDynamic(Car));
 export const insertRoute = catchAsync(insertOneDynamic(Route));
 export const insertTravelAgency= catchAsync(insertOneDynamic(TravelAgency));
 export const insertJourney= catchAsync(insertOneDynamic(Journey));






  
