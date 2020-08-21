// import { Exercise } from "./Exercise"
import DatabaseSetup from "../setup/DatabaseSetup"
import { DataTypes, Model, NOW } from "sequelize"
import User from "./User"
class Exercise extends Model {
	static User: any
}
Exercise.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.BIGINT,
			allowNull: false,
			autoIncrement: true,
			unique: true,
		},
		user_id: {
			type: DataTypes.BIGINT,
			references: {
				model: User,
				key: "id",
				// deferrable: INITIALLY_IMMEDIATE,
			},
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
		sequelize: DatabaseSetup, // We need to pass the connection instance
		modelName: "Exercise", // We need to choose the model name
		tableName: "exercises",
	}
)
console.log("HERE ===> ", { User, Exercise })
Exercise.User = Exercise.belongsTo(User, { foreignKey: "user_id" })
export default Exercise
