import express from "express"
// import expressValidator from "express-validator"
import helmet from "helmet"
import { json } from "body-parser"
import compression from "compression"
import * as consolidate from "consolidate"
import RouterSetup from "./RouterSetup"
import CronJobsSetup from "./CronJobsSetup"
import DatabaseSetup from "./DatabaseSetup"

export default async (app: express.Application): Promise<void> => {
	await DatabaseSetup()
	app.use([
		compression(),
		helmet(),
		// expressValidator(),
		json(), // application/json type post data
	])
		.engine("html", consolidate.ejs)
		.set("view engine", "html")
		.set("views", `${__dirname}/../modules`)

	await CronJobsSetup()
	// register all application routes
	RouterSetup(app)
}
