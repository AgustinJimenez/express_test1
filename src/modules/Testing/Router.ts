import { Application, Router } from "express"
import TestingController from "./Controller"
export default (app: Application) => Router().get("/timestamp/:date_string", TestingController.timestampMicroserviceForFCC())
