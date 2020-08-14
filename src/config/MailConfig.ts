import dotenv from "dotenv"
dotenv.config()

const config: {
	apiKey: string
	domain: string
	enterprise_email: string
} = {
	apiKey: process.env.MAIL_API_KEY,
	domain: process.env.MAIL_DOMAIN,
	enterprise_email: "agustin.jimenez.caba@gmail.com",
}

export default config
