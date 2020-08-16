import { Application, Router } from "express"
import TestingController from "./Controller"
export default (app: Application) =>
	Router()
		.get("/timestamp/:date_string?", TestingController.timestampMicroserviceForFCC())
		.get("/whoami", TestingController.whoami())
		.post("/shorturl/new", TestingController.shorturl_new())
		.post("/exercise/new-user", TestingController.new_user())
		.get("/exercise/users", TestingController.users())
		.post("/exercise/add", TestingController.add_exercise())
		.get("/exercise/log", TestingController.exercise_log())
