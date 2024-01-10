import { TravelAgency,Car,Route } from "../../models/index.js";
import { findTravelAgencyy } from "./passingid.js";
import { catchAsync } from "../../middlewares/globaleerorshandling.js";
const createDynamic = (model) => {
  return (async (req, res, next) => {
 

      let newObject={...req.body}

if(model== Car){
  let travelAgencyId=req.body.TravelAgencyId
let travevelAgencedata=await TravelAgency.findById(travelAgencyId)

newObject.TravelAgencyId=travelAgencyId
newObject.travelAgencyName=travevelAgencedata.travelAgenceName;
}
if(model == Route){
 newObject.routeName=newObject.departureCity+"<- - ->"+newObject.destinationCity

}
    const createdDoc = await model.create(newObject);
    if(model == Car){
      console.log("here ------------------------")
      let travelAgencyId=req.body.TravelAgencyId
      let travevelAgencedata=await TravelAgency.findById(travelAgencyId)
      travevelAgencedata.cars.push(createdDoc._id);
await travevelAgencedata.save();
    }

      if (!createdDoc) {
        return res.status(500).json({
          message: `Failed to create document in ${model.modelName} collection.`,
          data: null,
        });
      }
        return res.status(201).json({
        message: `Document created successfully in ${model.modelName} collection.`,
        data: createdDoc,
      });
   
      next();
    
  });
};
const createRoute = catchAsync(createDynamic(Route));
const createTravelAgency = catchAsync(createDynamic(TravelAgency));
const createCar = catchAsync(createDynamic(Car));
export { createRoute, createCar,createTravelAgency };
