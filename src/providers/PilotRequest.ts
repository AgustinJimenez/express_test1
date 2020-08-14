import axios, { AxiosRequestConfig } from "axios"
import { OK } from "http-status-codes"
import { Session } from "../entities/Session"
import dotenv from "dotenv"
dotenv.config()

const config: any = {
	sessionHoursDurationLimit: 1,
	sessionRequestLimit: 1000,
}

const pilotUrl = (suffix: string) => `${process.env.PILOT_API}/${suffix}`
const apiRoutesOptions: any = {
	auth: { url: pilotUrl("users/auth.php"), method: "POST" },
	sales_update: { url: pilotUrl("sales/update.php"), method: "POST" },
	sales_show: { url: pilotUrl("sales/read.php"), method: "POST" },
}
const pilotRoute = (routeName: string): AxiosRequestConfig => apiRoutesOptions[routeName]
const addRequestCount = async () => {
	const sessions = await Session.find()
	// console.log("HERE ===> ", sessions)
	if (!sessions[0]) return
	sessions[0].request_count += 1
	sessions[0].save()
}

export const getSession = async () => {
	let sessions = await Session.find()
	const hasNoSessions = !sessions.length
	const hasSessionDurationViolation = !!sessions[0] && sessions[0].duration >= config.sessionHoursDurationLimit
	const hasRquestCountViolation = sessions[0] && sessions[0].request_count >= config.sessionRequestLimit

	// console.log("AUTH-MIDDLEWARE ===> ", {hasNoSessions, hasSessionDurationViolation, hasRquestCountViolation})
	if (hasNoSessions || hasSessionDurationViolation || hasRquestCountViolation) {
		let response
		const error: any = null
		const params: any = {
			username: process.env.PILOT_USERNAME,
			password: process.env.PILOT_PASSWORD,
		}
		const axiosOptions: AxiosRequestConfig = {
			...pilotRoute("auth"),
			timeout: 10000,
			params,
		}
		// console.log("SESSION-CHECK ===> ", {axiosOptions, hasNoSessions, hasSessionDurationViolation, hasRquestCountViolation})
		try {
			response = await axios(axiosOptions)
		} catch (error) {
			console.log("CHECK-SESSION-ERROR ===> ", { error })
		} finally {
			if (
				!error &&
				!!response.data.result &&
				!!response.data.result.status &&
				response.data.result.status === "success" &&
				!!response.data.result.entitydata
			) {
				await Session.remove(sessions)

				const new_session: Session = await Session.create({
					username: params.username,
					token: response.data.result.entitydata,
					request_count: 1,
				}).save()
				sessions = [new_session]
			}
		}
	}
	return sessions[0]
}

interface IpilotResponse {
	response: any
	data: any
	error: any
	message: any
}

export default async (routeName: string, options?: AxiosRequestConfig, debug: boolean = false): Promise<IpilotResponse> => {
	const session = await getSession()

	let response: any = {}
	let message: string
	let error: any = false
	let data: any = {}

	const defaultOptions: AxiosRequestConfig = {
		...pilotRoute(routeName),
		timeout: 10000,
	}
	options = {
		...defaultOptions,
		...options,
	}

	if (!options["data"]) options["data"] = {}
	if (!options["data"]["header"]) options["data"]["header"] = {}
	if (!options["data"]["header"]["access_token"]) options["data"]["header"]["access_token"] = {}

	options["data"]["header"]["access_token"] = session["token"]

	if (debug) console.log("\n---PILOT-REQUEST ===> ", options)

	try {
		response = await axios(options)
		const httpIsOk: boolean = response["status"] === OK
		const pilotIsOk: boolean =
			!!response["data"] && !!response["data"]["result"] && !!response["data"]["result"]["status"] && response["data"]["result"]["status"] === "success"
		// if (debug)
		// console.log("\n---PILOT-REQUEST-RESPONSE ===> ", {httpIsOk, pilotIsOk, response})

		if (!httpIsOk || !pilotIsOk) throw true
	} catch (err) {
		error = err
		if (!!error["message"]) message = error["message"]
		else if (!!response["data"]["result"]["message"]) message = response["data"]["result"]["message"]
		else message = response["statusText"]
		console.log("\n---PILOT-REQUEST-ERROR ===> ", { options, response: response.data, error })
	} finally {
		// if (debug)
		// console.log("\n---PILOT-REQUEST-FINALLY ===> ", {options, response })
		addRequestCount()
		if (!!response["data"]["result"]) {
			if (!!response["data"]["result"]["entitydata"]) data = response["data"]["result"]["entitydata"]
			else data = response["data"]["result"]
		}
		// tslint:disable-next-line: no-unsafe-finally
		return { response, data, error, message }
	}
}
