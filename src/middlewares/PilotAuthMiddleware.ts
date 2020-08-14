import { Request, Response, Application, NextFunction } from "express"
import { OK, UNAUTHORIZED } from "http-status-codes"
import { Session } from "../entities/Session"
import pilotRequest from "../providers/PilotRequest"

const config: any = {
	sessionHoursDurationLimit: 1,
	sessionRequestLimit: 1000,
}

const AuthMiddleware = async (_app: Application, request: Request, response: Response, next: NextFunction) => {
	let isAutorized = false
	const sessions = await Session.find()
	const hasNoSessions = !sessions.length
	const hasSessionDurationViolation = !!sessions[0] && sessions[0].duration >= config.sessionHoursDurationLimit
	const hasRquestCountViolation = sessions[0] && sessions[0].request_count >= config.sessionRequestLimit

	// console.log("AUTH-MIDDLEWARE ===> ", {hasNoSessions, hasSessionDurationViolation, hasRquestCountViolation})

	if (hasNoSessions || hasSessionDurationViolation || hasRquestCountViolation) {
		const params: any = {
			username: process.env.PILOT_USERNAME,
			password: process.env.PILOT_PASSWORD,
		}
		const { data, error } = await pilotRequest("auth", { params })
		if (!error) {
			await Session.remove(sessions)
			await Session.create({ username: params.username, token: data, request_count: 1 }).save()
			isAutorized = true
		} else {
			isAutorized = false
		}
	} else {
		isAutorized = true
	}

	if (!isAutorized) return response.sendStatus(UNAUTHORIZED)
	next()
}

export default AuthMiddleware
