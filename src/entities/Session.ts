import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"
import moment from "moment"

@Entity("sessions")
export class Session extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		length: 50,
	})
	username: string

	@Column({
		length: 500,
	})
	token: string

	@Column({
		type: "int",
		default: 0,
	})
	request_count: number

	@Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
	timestamp: any

	get duration(): number {
		const duration = moment().diff(moment(this["timestamp"]), "hours", true)
		// console.log("DURATION HERE ===> ", duration)
		return duration
	}
}
