import express from "express";
import {
  deleteAllTickets,
  getAllTickets,
  updateTicket,
  deleteTicket,
} from "../controllers/index.js";

import { buyTickets } from "../controllers/creating/tickets.js";
import { payforticket } from "../controllers/creating/ticketspecial/payingforticket.js";

const TicketRouter = express.Router();

TicketRouter.post("/buyTickets/:journeyId", buyTickets);
TicketRouter.patch("/payforticket/:ticketId",payforticket)
TicketRouter.get("/getAllTickets", getAllTickets);
TicketRouter.patch("/updateTicket/:id", updateTicket);
TicketRouter.delete("/deleteTicket/:id", deleteTicket);
TicketRouter.delete("/deleteAllTickets", deleteAllTickets);

export default TicketRouter;
