import { Application } from "express"
import { modules_list } from "./../config/ModulesConfig"

const api_prefix: string = "/api/v1/"
// const modules_relative_path = "src/module
// const app_routers = readdirSync( modules_relative_path )

export default (app: Application) => {
	const app_routers = modules_list.map((module_name: string) => {
		const ModuleRouter = require(`./../modules/${module_name}/Router`).default
		return ModuleRouter(app)
	})

	return app.use(api_prefix, app_routers)
}
