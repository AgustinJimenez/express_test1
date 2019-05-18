import express from "express"
import PagoController from "./Controller"
import PagoValidator from "./Validator"

const controller: PagoController = new PagoController
const router = express.Router()


router.post( "/pago", PagoValidator("realizar_pago"), controller.realizar_pago )
    
export default router