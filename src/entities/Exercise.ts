import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, JoinColumn, OneToOne, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity("exercises")
export class Exercise extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		length: 255,
	})
	description: string

	@Column({
		length: 5,
	})
	duration: string

	@Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
	date: any

	@ManyToOne(
		(type: any) => User,
		(user: any) => user.exercises
	)
	user: User
}
