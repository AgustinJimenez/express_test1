import cron from "node-cron"
import moment from "moment"
// import syncSales from "../jobs/syncSales"

const debug: boolean = false
const CronJobsSetup = () =>
	cron.schedule("* * * * *", async () => {
		if (debug) console.log(`\n<======== Running tasks start [${moment().format("DD/MM/YYYY HH:mm:ss")}] ========>`)
		// await syncSales()
		if (debug) console.log(`\n<======== Running tasks end [${moment().format("DD/MM/YYYY HH:mm:ss")}] ========>`)
	})

export default CronJobsSetup
