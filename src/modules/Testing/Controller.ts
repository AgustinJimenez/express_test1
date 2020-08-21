import { Request, Response, NextFunction } from "express"
import { BAD_REQUEST } from "http-status-codes"
import dns from "dns"
import User from "../../entities/User"
import Exercise from "../../entities/Exercise"
import { MoreThan, QueryBuilder } from "typeorm"
export default class TestingController {
	/*
		@url: /api/v1/timestamp/:date_string?
	*/
	public static timestampMicroserviceForFCC = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			const date = request.params.date_string ? new Date(request.params.date_string) : new Date()

			if (isNaN(date.getTime())) return response.json({ error: "Invalid Date" })

			const unix = date.getTime()
			const utc = date.toUTCString()

			response.json({ unix, utc })
		},
	]
	/*
		@url: /api/v1/whoami
	*/
	public static whoami = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			response.json({
				ipaddress: request.ip,
				software: request.headers["user-agent"],
				language: request.headers["accept-language"],
			})
		},
	]
	/*
		@url: /api/v1/shorturl/new
		@params-example:
		{
			"url": "google.com.py"
		} 
	*/
	public static shorturl_new = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			dns.lookup(request.body.url, (err: NodeJS.ErrnoException, address: string, _family: number) => {
				if (!!err) return response.json({ error: "invalid URL" })

				response.json({ original_url: request.body.url, short_url: address })
			})
		},
	]
	/*
		@url: /api/v1/exercise/new-user
		@params-example:
		{
			"username": "John Doe"
		} 
	*/
	public static new_user = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			let new_user: User
			try {
				new_user = await User.create({ username: request.body.username })
			} catch (e) {
				return response.status(BAD_REQUEST).send()
			}

			response.json({ username: new_user.username, _id: new_user.id })
		},
	]
	/*
		@url: api/v1/exercise/users
	*/
	public static users = () => [
		async (_request: Request, response: Response, _next: NextFunction) => {
			const users: User[] = await User.findAll()
			response.json(users)
		},
	]

	/*
	@url: /api/v1/exercise/add
	@params-example:
	{
		"userId": 1,
		"description": "Description A",
		"duration": 154,
		"date": "2020-08-15 22:30:00"
	} 
	*/
	public static add_exercise = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			Exercise.create({
				user_id: request.body.userId,
				description: request.body.description,
				duration: request.body.duration,
				date: request.body.date,
			})

			const user = await User.findByPk(request.body.userId, {
				include: [
					{ model: Exercise, as: "Exercises" }, // load the profile picture.
					// Notice that the spelling must be the exact same as the one in the association
				],
			})

			response.json(user)
		},
	]
	/*
	@url: /api/v1/exercise/log
	@params-example:
	{
		"userId": 1,
	} 
	*/
	public static exercise_log = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			/* 	
			const user: User = await User.findOne(request.body.userId, {
				relations: ["exercises"],

				where: (query: any) => {
					if (!!request.body.from) query.where(`User__exercises.date >= :date_from`, { date_from: request.body.from })
					if (!!request.body.to) query.where(`User__exercises.date <= :date_to`, { date_to: request.body.to })
					// if (!!request.body.limit) query.take(request.body.limit)
				},
			})
			return response.json({ ...user, exercisesCount: user.exercises.length })
 */
		},
	]

	public static upload_file_form = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			return response.render("Testing/views/file_form.html")
		},
	]

	public static upload_file = () => [
		async (request: any, response: Response, _next: NextFunction) => {
			//console.log("HERE ===> ", { body: request.body, file: request.file })

			return response.json({
				fieldname: request.file.fieldname,
				filename: request.file.filename,
				size: request.file.size,
			})
		},
	]
}
