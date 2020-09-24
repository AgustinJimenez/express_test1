import { Request, Response, NextFunction } from "express"
import { OK } from "http-status-codes"
import { Customer } from "../../entities"
import { createCustomerValidator } from "./Validators"

export default class CustomerController {
	static index = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			let customers: any = []
			customers = Customer.findAll()
			response.json({ customers })
		},
	]
	static view = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			response.json({})
		},
	]
	static store = () => [
		...createCustomerValidator,
		async (request: Request, response: Response, _next: NextFunction) => {
			const data: any = request.body
			Customer.create(data)
			response.sendStatus(OK)
		},
	]
	static update = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			response.json({})
		},
	]
	static delete = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			response.json({})
		},
	]
}
