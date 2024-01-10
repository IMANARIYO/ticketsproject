import { Route,direction,Journey } from "../models/index.js";
import { catchAsync } from "../middlewares/globaleerorshandling.js";

const findByDepartureCity = (model) => catchAsync(async (req, res, next) => {
  const { departureCity } = req.params;

  const results = await model.find({ departureCity });

  res.status(200).json({
    message: `${model.modelName}s found for departure city: ${departureCity}`,
    data: results,
  });
});

const findRoutesByDepartureCity = findByDepartureCity(Route);
const findJourneyByDepartureCity = findByDepartureCity(Journey);
const findDirectionsByDepartureCity = findByDepartureCity(direction);

const findByDestinationCity = (model) => catchAsync(async (req, res, next) => {
  const { destinationCity } = req.params;

  const results = await model.find({ destinationCity });

  res.status(200).json({
    message: `${model.modelName}s found for destination city: ${destinationCity}`,
    data: results,
  });
});
const findJourneyByDestinationCity = findByDestinationCity(Journey);
const findRoutesByDestinationCity = findByDestinationCity(Route);
const findDirectionsByDestinationCity = findByDestinationCity(direction);

export {
  findRoutesByDepartureCity,
  findDirectionsByDepartureCity,
  findRoutesByDestinationCity,
  findJourneyByDestinationCity,
  findJourneyByDepartureCity
};
