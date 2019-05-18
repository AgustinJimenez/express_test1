import dotenv from "dotenv"
dotenv.config()

const IS_PRODUCTION = process.env.IS_PRODUCTION
const BILLETERA_PERSONA_API_URL = IS_PRODUCTION 
    ? 
        "https://www.personal.com.py/ApiComerciosMaven/webresources/"
    : 
        "http://jbdmzpre.personal.com.py/ApiComerciosMaven/webresources/"

export default 
{
    BILLETERA_PERSONA_API_URL

}