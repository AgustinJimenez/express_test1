import { Request, Response, NextFunction } from "express"
import { OK } from "http-status-codes"
export default class HomeController {
	public static home = () => [
		async (_request: Request, response: Response, _next: NextFunction) => {
			response.sendStatus(OK).send("Pilot Intergration Home.")
		},
	]
}
