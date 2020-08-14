import moment from "moment"

const logFileFolderPath: string = "src/logs"
const today: string = moment().format("YYYY_MM_DD")
const logFileName: string = `${today}.log`
const fullFilePath: string = `${logFileFolderPath}/${logFileName}`

// if( !fs.existsSync(fullFilePath) )
// fs.appendFile(fullFilePath)

export default require("simple-node-logger").createSimpleLogger({
	logFilePath: fullFilePath,
	timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS",
})
