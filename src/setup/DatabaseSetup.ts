import DatabaseConfig from "../config/DatabaseConfig"
import { Sequelize } from "sequelize"
import log from "../providers/LoggerProvider"

import { init as initUser, User } from "../entities/User"
import { init as initExercise, Exercise } from "../entities/Exercise"

const initializeSequelizeEntities = async (sequelize: Sequelize) => {
	initUser(sequelize)
	User.sync()
	initExercise(sequelize)
	Exercise.sync()
}

const DatabaseSetup = async () => {
	const sequelize = new Sequelize(DatabaseConfig.database, DatabaseConfig.username, DatabaseConfig.password, {
		host: DatabaseConfig.host,
		dialect: DatabaseConfig.type,
		logging: (SQL: string, timing: number) => log.info({ SQL, timing }),
	})
	await sequelize.authenticate()
	await initializeSequelizeEntities(sequelize)

	/* 
        Closing the connection
        Sequelize will keep the connection open by default, and use the same connection for all queries. 
        If you need to close the connection, call sequelize.close() (which is asynchronous and returns a Promise). 
    */
}

export default DatabaseSetup
