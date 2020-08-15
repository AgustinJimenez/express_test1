import { Request, Response, NextFunction } from "express"
import { OK } from "http-status-codes"
import dns from "dns"
export default class TestingController {
	public static timestampMicroserviceForFCC = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			const date = request.params.date_string ? new Date(request.params.date_string) : new Date()

			if (isNaN(date.getTime())) return response.json({ error: "Invalid Date" })

			const unix = date.getTime()
			const utc = date.toUTCString()

			response.json({ unix, utc })
		},
	]

	public static whoami = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			response.json({
				ipaddress: request.ip,
				software: request.headers["user-agent"],
				language: request.headers["accept-language"],
			})
		},
	]

	public static shorturl_new = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			dns.lookup(request.body.url, (err: NodeJS.ErrnoException, address: string, _family: number) => {
				if (!!err) return response.json({ error: "invalid URL" })

				response.json({ original_url: request.body.url, short_url: address })
			})
		},
	]
}
