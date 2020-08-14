import { Logger } from "typeorm"
import log from "./LoggerProvider"

export class DatabaseORMLogger implements Logger {
	logQuery(query: string, parameters?: any[], queryRunner?: import("typeorm").QueryRunner) {
		// console.log("HERE ====> ", { parameters })
		switch (query.split(" ")[0]) {
			case "UPDATE":
				// log.info(query)
				break
			case "CREATE":
				// log.info(query)
				break
			default:
				break
		}

		// throw new Error("Method not implemented.");
	}
	logQueryError(error: string, query: string, parameters?: any[], queryRunner?: import("typeorm").QueryRunner) {
		// throw new Error("Method not implemented.");
	}
	logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: import("typeorm").QueryRunner) {
		// console.log("\n-DatabaseORMLogger-logQuerySlow HERE ===> ", {time, query, parameters, queryRunner})
		// throw new Error("Method not implemented.");
	}
	logSchemaBuild(message: string, queryRunner?: import("typeorm").QueryRunner) {
		// console.log("\n-DatabaseORMLogger-logSchemaBuild HERE ===> ", {queryRunner})
		// throw new Error("Method not implemented.");
	}
	logMigration(message: string, queryRunner?: import("typeorm").QueryRunner) {
		// console.log("\n-DatabaseORMLogger-logMigration HERE ===> ", {queryRunner})
		// throw new Error("Method not implemented.");
	}
	log(level: "log" | "info" | "warn", message: any, queryRunner?: import("typeorm").QueryRunner) {
		// console.log("\n-DatabaseORMLogger-log HERE ===> ", {queryRunner})
		// throw new Error("Method not implemented.");
	}

	// implement all methods from logger class
}
