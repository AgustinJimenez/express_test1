import { Request, Response, NextFunction } from "express"
import { UNAUTHORIZED } from "http-status-codes"

const AuthMiddleware = () => [
	(request: Request, response: Response, next: NextFunction) => {
		// tslint:disable-next-line: max-line-length
		// console.log('AUTH-MIDDLEWARE ===> ', {env: process.env.TOKEN , Authorization: request.header("Authorization") })
		if (process.env.TOKEN !== request.header("Authorization")) return response.sendStatus(UNAUTHORIZED)

		next()
	},
]
export default AuthMiddleware
