
import { Route } from "../models/routes.js";
export const partialSearchRoutes = async (req, res, next) => {
  try {
    // Extract the search query from the request
    const { query } = req.query;

    // If the query is provided, perform a case-insensitive partial match
    let searchCriteria = {};
    if (query) {
      searchCriteria = {
        $or: [
          { departureCity: { $regex: new RegExp(query, 'i') } }, // Case-insensitive partial match
         
        ],
      };
    }

    // Perform the search using the constructed query
    const routes = await Route.find(searchCriteria);

    res.status(200).json({ routes });
  } catch (error) {
    console.error("Error searching routes:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
