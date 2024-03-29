import { Route, direction, Journey } from "../models/index.js";
import { catchAsync } from "../middlewares/globaleerorshandling.js";

const findDocumentByCities = (model) => catchAsync(async (req, res, next) => {
  const { departureCity, destinationCity } = req.body;

  const result = await model.findOne({ departureCity, destinationCity });
  if(model == Journey ){
    const result = await model.find({ departureCity, destinationCity });
    
  }

  if (!result) {
    return res.status(404).json({
      message: `No ${model.modelName} found for departure city: ${departureCity} and destination city: ${destinationCity}`,
      data: null,
    });
  }


return result;
});

const findRoutesByCities = findDocumentByCities(Route);
const findJourneyByCities = findDocumentByCities(Journey);
const findDirectionsByCities = findDocumentByCities(direction);

export {
  findRoutesByCities,
  findJourneyByCities,
  findDirectionsByCities,
};
