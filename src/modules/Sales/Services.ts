export const retrieveAllUnsynchronizedSales = async (): Promise<any[]> => {
	const sales: any[] = []
	console.log("exportUnsynchronizedSales!!!!", { sales })
	return sales
}
export const syncUnsyncronizedSalesService = async (): Promise<void> => {
	const unsyncSales: any[] = await retrieveAllUnsynchronizedSales()
	console.log("syncUnsyncronizedSales!!!!", { unsyncSales })
}
