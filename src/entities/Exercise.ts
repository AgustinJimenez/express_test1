// import { Exercise } from "./Exercise"

import { Sequelize, DataTypes, Model, NOW } from "sequelize"
import { User } from "./User"
class ExerciseModel extends Model {
	static User: any
	id: any
	username: any
	User: any
}

ExerciseModel.User = ExerciseModel.belongsTo(User)

export const init = (sequelize: Sequelize) =>
	ExerciseModel.init(
		{
			id: {
				primaryKey: true,
				type: DataTypes.BIGINT,
				allowNull: false,
				autoIncrement: true,
				unique: true,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [0, 255],
				},
			},
			duration: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			date: {
				type: DataTypes.DATEONLY,
				allowNull: false,
				defaultValue: NOW,
			},
		},
		{
			// Other model options go here
			sequelize, // We need to pass the connection instance
			modelName: "Exercise", // We need to choose the model name
			tableName: "exercises",
		}
	)

export const Exercise = ExerciseModel
export default { Exercise, init }
