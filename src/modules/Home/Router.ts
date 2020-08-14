import { Application, Router } from "express"
import HomeController from "./Controller"
export default (app: Application) => Router().get("/", HomeController.home())
