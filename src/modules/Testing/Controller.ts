import { Request, Response, NextFunction } from "express"
import { OK } from "http-status-codes"
export default class TestingController {
	public static timestampMicroserviceForFCC = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			let date_string: string = request.params.date_string

			console.log("HERE ====> ", date_string)

			response.sendStatus(OK).send("Here is timestampMicroserviceForFCC")
		},
	]
}
