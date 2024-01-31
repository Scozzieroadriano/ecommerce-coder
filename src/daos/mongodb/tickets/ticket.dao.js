import MongoDao from "../mongo.dao.js";
import { TicketModel } from "./ticket.model.js";

export default class TicketMongoDao extends MongoDao {
    constructor() {
        super(TicketModel);
    }

}