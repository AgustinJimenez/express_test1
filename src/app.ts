import dotenv from "dotenv"
import express from "express"
import http from "http"
import app_setup from "./setup/AppSetup"

dotenv.config()
const PORT = process.env.SERVER_PORT
const app: express.Application = express()
app_setup( app )
// list all endpoints to console
// tslint:disable-next-line:no-console
console.log( require("express-list-endpoints")( app ) )
// const httpsOptions: https.ServerOptions = {}

http.createServer(app).listen(PORT, () => 
{
    // tslint:disable-next-line: no-console
    console.log
    (
        `<=========================================>`,
        `Server started at http://localhost:${ PORT }!`,
        `<=========================================>`
    )
})