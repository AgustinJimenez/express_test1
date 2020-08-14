import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity("sales")
export class Sale extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string

	@Column({ type: "json" })
	fields: any

	@Column({ type: "boolean", default: true })
	sync: boolean

	@Column({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" })
	timestamp: any

	get datasToUpdateApi() {
		// console.log("HERE datasToUpdateApi ====> ", {FIELDS: this["fields"]})
		const fields: any = {
			id: this["fields"]["id"],
			integration_reference_code: this["fields"]["integration_reference_code"],
			customer_id: this["fields"]["customer"]["id"],
			type_code: this["fields"]["type"]["code"],
			product_code: this["fields"]["product"]["code"],
			// product_desired_color: "Blanco",
			// product_average_km_per_year: 10000,
			commission_amt: this["fields"]["commission"]["amt"],
			commission_dt: this["fields"]["commission"]["date"],
			trade_in_car_inspection_number: "", // this["fields"]["payment_methods"]["trade_in_car"]["year"],
			// trade_in_car_inspection_user_id : "6174",
			// trade_in_car_repairment_costs : "1000",
			// trade_in_car_estimate_sale_amt : "350000",
			// trade_in_car_profitability_percentaje : "14",
			// credit_status_code: this["fields"]["credit"]["status"],
			// credit_reward_amt: this["fields"]["credit"]["status"],
			// credit_reward_subtract_from_total_flag: this["fields"]["credit"]["status"],
			vehicle_registration_plate_by_code: this["fields"]["vehicle_registration_plate_by"],
			approximate_vehicle_registration_plate_date: this["fields"]["approximate_vehicle_registration_plate_date"],
			approximate_delivery_date: this["fields"]["approximate_delivery_date"],
			observations: this["fields"]["observations"],
		}

		if (!!this["fields"]["payment_methods"]) {
			fields["cash_amt"] = this["fields"]["payment_methods"]["cash_amt"]
			fields["trade_in_car_brand"] = this["fields"]["payment_methods"]["trade_in_car"]["brand"]
			fields["trade_in_car_domain"] = this["fields"]["payment_methods"]["trade_in_car"]["domain"]
			fields["trade_in_car_kms"] = this["fields"]["payment_methods"]["trade_in_car"]["kms"]
			fields["trade_in_car_model"] = this["fields"]["payment_methods"]["trade_in_car"]["model"]
			fields["trade_in_car_value_amt"] = this["fields"]["payment_methods"]["trade_in_car"]["value_amt"]
			fields["trade_in_car_version"] = this["fields"]["payment_methods"]["trade_in_car"]["version"]
			fields["trade_in_car_year"] = this["fields"]["payment_methods"]["trade_in_car"]["year"]
			fields["expenses_amt"] = this["fields"]["payment_methods"]["expenses_amt"]
			fields["cash_reserve_amt"] = this["fields"]["payment_methods"]["cash_reserve_amt"]
			fields["cash_reserve_dt"] = this["fields"]["payment_methods"]["cash_reserve_dt"]
			fields["reinforcement_payment_dt"] = this["fields"]["payment_methods"]["reinforcement_payment_dt"]
		}

		if (!!this["fields"]["credit"]) {
			fields["credit_amt"] = this["fields"]["credit"]["credit_amt"]
			fields["credit_bank"] = this["fields"]["credit"]["bank"]
			fields["credit_rate"] = this["fields"]["credit"]["rate"]
			fields["credit_shares"] = this["fields"]["credit"]["shares"]
			fields["credit_shares_amt"] = this["fields"]["credit"]["shares_amt"]
			fields["credit_insurance_amt"] = this["fields"]["credit"]["insurance_amt"]
			fields["credit_status_dt"] = this["fields"]["credit"]["status_dt"]
		}

		return fields
	}
}
