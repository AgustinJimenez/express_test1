import { Request, Response } from "express"
import { OK, UNPROCESSABLE_ENTITY, INTERNAL_SERVER_ERROR } from "http-status-codes"
import { syncUnsyncronizedSalesService } from "./Services"
import { Sale } from "../../entities/Sale"
import log from "../../providers/LoggerProvider"
export default class SalesController {
	public static exportUnsynchronizedSales = async () => [
		async (request: Request, response: Response) => {
			await syncUnsyncronizedSalesService()

			response.status(OK)
		},
	]
	public static store = () => [
		async (request: Request, response: Response) => {
			const saleData = request.body
			let newSale: Sale = new Sale()
			try {
				newSale = await Sale.create({ id: saleData.id, fields: saleData }).save()
			} catch (error) {
				const message: string = `${error.message} - ${JSON.stringify(saleData)}`
				log.error(message)
				return response.status(INTERNAL_SERVER_ERROR).send(message)
			}

			if (newSale.hasId()) {
				log.info("SALE CREATED: " + JSON.stringify(saleData))
				return response.sendStatus(OK)
			}
			return response.sendStatus(UNPROCESSABLE_ENTITY)
		},
	]
}
