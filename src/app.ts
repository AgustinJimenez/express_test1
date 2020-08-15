import express, { Express } from "express"
import http from "http"
import AppSetup from "./setup/AppSetup"
import "reflect-metadata"
import listEndpoints from "express-list-endpoints"

const App = async () => {
	const HOST: string = process.env.SERVER_HOST
	const PORT: number = +process.env.SERVER_PORT
	const isProduction: boolean = process.env.IS_PRODUCTION === "true"
	const app: Express = express()
	await AppSetup(app)
	// list all endpoints to console
	if (!isProduction) console.log(listEndpoints(app))
	// const httpsOptions: https.ServerOptions = {}

	http.createServer(app).listen(PORT, HOST, () => {
		if (process.env.IS_PRODUCTION !== "true")
			console.log(`<=========================================>`, `Server started at port ${HOST}:${PORT}!`, `<=========================================>`)
	})
}
App()
