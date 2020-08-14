import { Sale } from "../entities/Sale"
import PilotRequest from "../providers/PilotRequest"
import log from "../providers/LoggerProvider"

export default async () => {
	const unsyncSales: Sale[] = await Sale.find({ where: { sync: false } })

	for (let uSale of unsyncSales) {
		const res = await PilotRequest("sales_update", {
			data: {
				data: uSale.datasToUpdateApi,
			},
		})
		if (res.error) {
			console.log("\n\n-HERE ERROR ===> ", { res })
			continue
		}
		const { data, error, message } = await PilotRequest("sales_show", {
			data: {
				data: {
					id: uSale.id,
				},
			},
		})
		if (error) {
			console.log("\n\n-HERE ERROR ===> ", { error, message, data })
			continue
		}

		uSale["fields"] = data
		uSale["sync"] = true
		uSale = await uSale.save()
		log.info("SALE UPDATED: " + JSON.stringify(uSale["fields"]))
	}
}
