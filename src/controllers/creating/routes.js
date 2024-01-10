import { Route } from "../../models/index.js";

import { catchAsync } from "../../middlewares/globaleerorshandling.js";

const createDynamic = (model) => {
  return catchAsync(async (req, res, next) => {
    try {
        let newObject = { ...req.body}
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
const createRoute = catchAsync(createDynamic(Route));

export { createRoute };
