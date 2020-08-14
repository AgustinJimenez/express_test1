import MailConfig from "../config/MailConfig"
import { isNull } from "util"
import mailgun from "mailgun-js"
export default class Emailer {
	private emailer: any
	private mail_config: any
	constructor(type: string = "mailgun", config: object = null) {
		switch (type) {
			case "mailgun":
				this.mail_config = isNull(config) ? MailConfig : config
				this.emailer = mailgun(this.mail_config)
		}
	}

	send = async (
		data: {
			from: string
			to: string
			subject: string
			html: string
			text: string
		} = {
			from: null,
			to: null,
			subject: null,
			html: null,
			text: null,
		}
	) => await this.emailer.messages().send(data)
}
