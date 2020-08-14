import { check, validationResult, Result, ValidationError } from "express-validator"
import { Request, Response, NextFunction } from "express"
import { UNPROCESSABLE_ENTITY } from "http-status-codes"

const SaleValidation = () => [check("id").exists()]

export const SaleRequest = (): any[] => [
	SaleValidation(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors: Result<ValidationError> = validationResult(req)
		if (!errors.isEmpty()) return res.status(UNPROCESSABLE_ENTITY).json({ errors: errors.array() })
		next()
	},
]
