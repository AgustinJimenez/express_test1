import { Request, Response, NextFunction } from "express"
import { BAD_REQUEST, NOT_FOUND } from "http-status-codes"
import dns from "dns"
import { User, Exercise } from "../../entities"
import { Op, Sequelize } from "sequelize"

export default class TestingController {
	/*
		Timestamp Microservice
		@ref: https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/timestamp-microservice
		@url: /api/v1/timestamp/:date_string?
	*/
	public static timestampMicroserviceForFCC = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			let date: Date = new Date()
			let date_string: any = request.params.date_string

			if (!!date_string && !isNaN(+date_string)) date = new Date(+date_string)
			else if (!!date_string) date = new Date(date_string)

			if (isNaN(date.getTime())) return response.json({ error: "Invalid Date" })

			const unix = date.getTime()
			const utc = date.toUTCString()

			response.json({ unix, utc })
		},
	]
	/*
		Header Parser Microservice
		@ref: https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/request-header-parser-microservice
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
		URL Shortener Microservice
		@ref: https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/url-shortener-microservice
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
		Exercise Tracker
		@ref: https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker
		@description: create a user.
		@url: /api/v1/exercise/new-user
		@params-example:
		{
			"username": "John Doe"
		} 
	*/
	public static new_user = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			let new_user: any
			try {
				new_user = await User.create({ username: request.body.username })
			} catch (e) {
				return response.status(BAD_REQUEST).send()
			}

			response.json({ username: new_user.username, _id: new_user.id })
		},
	]
	/*
		@ref: https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker
		@description: retrieve all users from database
		@url: api/v1/exercise/users
	*/
	public static users = () => [
		async (_request: Request, response: Response, _next: NextFunction) => {
			const users: any[] = await User.findAll()
			response.json(users)
		},
	]

	/*
	Exercise Tracker
	@ref: https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker
	@description: add a exercise to a user
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
	Exercise Tracker
	@ref: https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker
	@description: retrieve a user exercises log
	@url: /api/v1/exercise/log
	@params-example:
	{
		"userId": 1,
	} 
	*/
	public static exercise_log = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			const whereExerciseDateBetween = []
			if (!!request.body.from) whereExerciseDateBetween.push(request.body.from)
			if (!!request.body.to) whereExerciseDateBetween.push(request.body.to)

			const exercisesWhereConditions: any = {}
			if (whereExerciseDateBetween.length === 2)
				exercisesWhereConditions["date"] = {
					[Op.between]: whereExerciseDateBetween,
				}

			const user: any = await User.findOne({
				where: {
					id: request.body.userId,
				},
				attributes: { exclude: ["createdAt", "updatedAt"] },
				include: [
					{
						association: "exercises",
						attributes: { exclude: ["createdAt", "updatedAt"] },
						limit: request.body.limit,
						where: exercisesWhereConditions,
					},
				],
			})
			if (!user) return response.sendStatus(NOT_FOUND)
			return response.json({ ...user.toJSON(), exercisesCount: user.exercises.length })
		},
	]
	/* 
	File Metadata Microservice
	@ref: https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/file-metadata-microservice
	@url: /api/v1/upload_file
	*/
	public static upload_file_form = () => [
		async (request: Request, response: Response, _next: NextFunction) => {
			return response.render("Testing/views/file_form.html")
		},
	]
	/* 
	File Metadata Microservice
	@ref: https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/file-metadata-microservice
	@url: /api/v1/upload_file
	*/
	public static upload_file = () => [
		async (request: any, response: Response, _next: NextFunction) => {
			// console.log("HERE ===> ", { body: request.body, file: request.file })

			return response.json({
				fieldname: request.file.fieldname,
				filename: request.file.filename,
				size: request.file.size,
			})
		},
	]
}
