import { Application, Router } from "express"
import SalesController from "./Controller"
import { SaleRequest } from "./Requests"
import AuthMiddleware from "../../middlewares/AuthMiddleware"

export default (app: Application) =>
	Router() /* 
		.get(
			"/exportUnsynchronizedSales",
			// (req, res, next) => AuthMiddleware(app, req, res, next),
			() => SalesController.exportUnsynchronizedSales()
		) */
		.post("/sales/store", AuthMiddleware(), SaleRequest(), SalesController.store())
