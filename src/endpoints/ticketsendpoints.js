import express from "express";
import {insertTicket,
  deleteAllTickets,
  getAllTickets,
  updateTicket,
  deleteTicket,
  findTicket,
  
} from "../controllers/index.js";

import { insertticketsp } from "../controllers/ticketscontrollers/creatingticket.js";
const TicketRouter = express.Router();
//creating ticket
TicketRouter.post("/createTicket/:JOurneyID", insertticketsp);

// Get all tickets
TicketRouter.get("/getAllTickets", getAllTickets);

// Get a specific ticket by ID
TicketRouter.get("/findTicket/:id", findTicket);

// Update a specific ticket by ID
TicketRouter.patch("/updateTicket/:id", updateTicket);

// Delete a specific ticket by ID
TicketRouter.delete("/deleteTicket/:id", deleteTicket);

// Delete all tickets (use with caution)
TicketRouter.delete("/deleteAllTickets", deleteAllTickets);

export default TicketRouter;
