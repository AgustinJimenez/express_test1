import express from "express"
import HomeController from "./HomeController"

const controller: HomeController = new HomeController
const router = express.Router()

router.route("/").get( controller.index )

export default router


    // tslint:disable-next-line: indent
    /*
    .post((req: Request, res: Response) => {
    // Create new contact
        res.status(200).send({
            message: "POST request successfulll!!!!"
        })
    })

    // Contact detail
    app.route("/contact/:contactId")
    // get specific contact
    .get((req: Request, res: Response) => {
    // Get a single contact detail
        res.status(200).send({
            message: "GET request successfulll!!!!"
        })
    })
    .put((req: Request, res: Response) => {
    // Update a contact
        res.status(200).send({
            message: "PUT request successfulll!!!!"
        })
    })
    .delete((req: Request, res: Response) => {
    // Delete a contact
        res.status(200).send({
            message: "DELETE request successfulll!!!!"
        })
    })

    */
    
