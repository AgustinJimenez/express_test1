import Exercise from "./Exercise"
import DatabaseSetup from "../setup/DatabaseSetup"
import { DataTypes, Model } from "sequelize"

class User extends Model {
	static Exercises: any
	id: any
	username: any
	Exercises: any
}

User.init(
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
		sequelize: DatabaseSetup, // We need to pass the connection instance
		modelName: "User", // We need to choose the model name
		tableName: "users",
	}
)
User.Exercises = User.hasMany(Exercise, { foreignKey: "user_id" })
export default User
