import express from "express"
import log from "../providers/LoggerProvider"
export default (app: express.Application, error: any) => {
	log.error(error)
}
