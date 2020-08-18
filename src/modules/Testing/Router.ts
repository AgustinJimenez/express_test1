import { Application, Router } from "express"
import TestingController from "./Controller"
import multer from "multer"

const upload = multer({ dest: "uploads/" })

export default (app: Application) =>
	Router()
		.get("/timestamp/:date_string?", TestingController.timestampMicroserviceForFCC())
		.get("/whoami", TestingController.whoami())
		.post("/shorturl/new", TestingController.shorturl_new())
		.post("/exercise/new-user", TestingController.new_user())
		.get("/exercise/users", TestingController.users())
		.post("/exercise/add", TestingController.add_exercise())
		.post("/exercise/log", TestingController.exercise_log())
		.get("/upload_file/form", TestingController.upload_file_form())
		.post("/upload_file", upload.single("upfile"), TestingController.upload_file())
