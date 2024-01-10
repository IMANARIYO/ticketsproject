import { catchAsync } from "../middlewares/globaleerorshandling.js";
import { TravelAgency,Car,Route,Ticket,Journey,direction } from "../models/index.js";
const getByIdDynamic = model => {
  return catchAsync(async (req, res, next) => {
    const { id } = req.params;

    try {
      const doc = await model.findById(id);

      if (!doc) {
        return res.status(404).json({
          message: `No ${model.modelName} found with id: ${id}.`,
        });
      }

      res.status(200).json({
        message: `${model.modelName} with id ${id} retrieved successfully.`,
        data: doc,
      });
    } catch (error) {
      next(error);
    }
  });
};

const getRouteById = getByIdDynamic(Route);
const getTravelAgencyById = getByIdDynamic(TravelAgency);
const getCarById = getByIdDynamic(Car);
const getTicketById = getByIdDynamic(Ticket);
const getJourneyById = getByIdDynamic(Journey);
const getDirectionById = getByIdDynamic(direction);
export { getRouteById, getTravelAgencyById, getCarById, getTicketById, getJourneyById,getDirectionById };
