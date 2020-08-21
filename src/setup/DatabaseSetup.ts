import DatabaseConfig from "../config/DatabaseConfig"
import { Sequelize } from "sequelize"
import log from "../providers/LoggerProvider"

const DatabaseSetup: Sequelize = new Sequelize(DatabaseConfig.database, DatabaseConfig.username, DatabaseConfig.password, {
	host: DatabaseConfig.host,
	dialect: DatabaseConfig.type,
	logging: (SQL: string, timing: number) => log.info({ SQL, timing }),
})
export const HELP: string = "help mee here"
export default DatabaseSetup
