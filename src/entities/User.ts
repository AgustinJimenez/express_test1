import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm"
import { Exercise } from "./Exercise"

@Entity("users")
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		length: 50,
		unique: true,
	})
	username: string

	@OneToMany(
		(type: any) => Exercise,
		(exercise: any) => exercise.user
	)
	exercises: Exercise[]
}
