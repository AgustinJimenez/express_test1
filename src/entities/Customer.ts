import { DataTypes, Model, NOW } from "sequelize"

class CustomerModel extends Model {
	id: any
	fullname: string
	registration_date: any
}

export default CustomerModel
