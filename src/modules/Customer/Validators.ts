import { Request, Response, NextFunction } from "express"
import { Customer } from "../../entities"
import { body, validationResult } from "express-validator"
import { BAD_REQUEST } from "http-status-codes"

export const createCustomerValidator = [
	body("fullname")
		.notEmpty()
		.isString()
		.trim()
		.escape()
		.isLength({ min: 3, max: 255 })
		.custom(async (fullname: string) => {
			const customer: any = await Customer.findOne({ where: { fullname } })
			if (!!customer) throw new Error("Already exists")
		}),

	(request: Request, response: Response, next: NextFunction) => {
		const errors = validationResult(request)
		if (!errors.isEmpty()) return response.status(BAD_REQUEST).send(errors.array({ onlyFirstError: true }))
		next()
	},
]
