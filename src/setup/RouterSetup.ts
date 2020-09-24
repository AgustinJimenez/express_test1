import { Application } from "express"

import HomeModule from "../modules/Home/Router"
import SalesModule from "../modules/Sales/Router"
import TestingModule from "../modules/Testing/Router"
import CustomerModule from "../modules/Customer/Router"

export default (app: Application) => app.use("/api/v1/", [HomeModule(app), SalesModule(app), TestingModule(app), CustomerModule(app)])
