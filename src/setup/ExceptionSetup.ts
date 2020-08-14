export default (error: any) => {
	console.error("EXCEPTION HANDLER ====> ", error)
	// response.status(INTERNAL_SERVER_ERROR).send(error.message)
}
