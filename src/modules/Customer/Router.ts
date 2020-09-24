import { Application, Router } from "express"
import CustomerController from "./Controller"

export default (app: Application) =>
	Router()
		.get("/customers/", CustomerController.index())
		.post("/customers/", CustomerController.store())
		.put("/customers/:id", CustomerController.update())
		.delete("/customers/:id", CustomerController.delete())
