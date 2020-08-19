import { Exercise } from "./Exercise"

import { Sequelize, DataTypes, Model } from "sequelize"

class UserModel extends Model {
	static Exercises: any
	id: any
	username: any
}
UserModel.Exercises = UserModel.hasMany(Exercise)
export const init = (sequelize: Sequelize) =>
	UserModel.init(
		{
			id: {
				primaryKey: true,
				type: DataTypes.BIGINT,
				allowNull: false,
				autoIncrement: true,
				unique: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					len: [3, 60],
				},
			},
		},
		{
			// Other model options go here
			sequelize, // We need to pass the connection instance
			modelName: "User", // We need to choose the model name
			tableName: "users",
		}
	)

export const User = UserModel
export default { User, init }
