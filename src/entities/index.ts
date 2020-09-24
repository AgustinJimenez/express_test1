// import { Exercise } from "./Exercise"
import DatabaseSetup from "../setup/DatabaseSetup"
import { DataTypes, Model, NOW } from "sequelize"
import CustomerModel from "./Customer"

class ExerciseModel extends Model {
	static User: any
}

// tslint:disable-next-line: max-classes-per-file
class UserModel extends Model {
	static Exercises: any
	id: any
	username: any
	Exercises: any
}
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
		sequelize: DatabaseSetup, // We need to pass the connection instance
		modelName: "User", // We need to choose the model name
		tableName: "users",
	}
)
ExerciseModel.init(
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
				model: UserModel,
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
		modelName: "exercise", // We need to choose the model name
		tableName: "exercises",
	}
)
CustomerModel.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.BIGINT,
			allowNull: false,
			autoIncrement: true,
			unique: true,
		},
		fullname: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: [0, 255],
			},
		},
		registration_date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			defaultValue: NOW,
		},
	},
	{
		// Other model options go here
		sequelize: DatabaseSetup, // We need to pass the connection instance
		modelName: "customer", // We need to choose the model name
		tableName: "customers",
	}
)

UserModel.Exercises = UserModel.hasMany(ExerciseModel, { foreignKey: "user_id" })
ExerciseModel.User = ExerciseModel.belongsTo(UserModel, { foreignKey: "user_id" })

UserModel.sync()
ExerciseModel.sync()
CustomerModel.sync()

export const Exercise = ExerciseModel
export const User = UserModel
export const Customer = CustomerModel
