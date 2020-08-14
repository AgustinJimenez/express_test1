import dotenv from "dotenv"
import { ConnectionOptions } from "typeorm/connection/ConnectionOptions"
import { DatabaseORMLogger } from "../providers/DatabaseORMLogger"
import { EntitiesList } from "../entities"

dotenv.config()
const type: any = process.env.DATABASE_TYPE || "postgres"
const host: string = process.env.DATABASE_HOST || "localhost"
const port: number = +process.env.DATABASE_PORT || 5432
const username: string = process.env.DATABASE_USERNAME || "postgres"
const password: string = process.env.DATABASE_PASSWORD || "postgres"
const database: string = process.env.DATABASE_NAME || "pilot_integration"
const config: ConnectionOptions = {
	type,
	host,
	port,
	username,
	password,
	database,
	entities: EntitiesList,
	synchronize: true,
	logging: ["query"], // ["all"]
	logger: new DatabaseORMLogger(), // "file",
}

export default config
