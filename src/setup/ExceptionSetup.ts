import log from "../providers/LoggerProvider"
export default (error: any) => {
	log.error(error)
}
