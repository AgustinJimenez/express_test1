import { Request, Response, NextFunction } from "express"
import { OK } from "http-status-codes"
export default class TestingController {
	public static timestampMicroserviceForFCC = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			const date = request.params.date_string ? new Date(request.params.date_string) : new Date()

			if (isNaN(date.getTime())) response.json({ error: "Invalid Date" })

			const unix = date.getTime()
			const utc = date.toUTCString()

			response.json({ unix, utc })
		},
	]
}
