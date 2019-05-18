import { Request, Response } from "express"
import { validationResult } from "express-validator/check";
import { OK, UNPROCESSABLE_ENTITY } from "http-status-codes"
import { isNull } from "util"
import moment from "moment"
import { ejs as render } from "consolidate"
import Emailer from "../../providers/Emailer"
import MailConfig from "../../config/MailConfig"

const send_email_is_allowed_here: boolean = false
const emails_templates_path = (view: string) => `src/modules/Pago/views/${view}`

export default class PagoController 
{
    
    private passenger_trip_resume_invoice_template_path: string = 
        emails_templates_path(`client_trip_resume_and_invoice.html`)
    private passenger_trip_receipt_invoice_template_path: string = 
        emails_templates_path(`client_trip_receipt_of_invoice.html`)
    private muver_trip_resume_template_path: string = 
        emails_templates_path(`muver_trip_resume.html`)
    private passenger_trip_invoice: { html: string } = { html: null }
    private passenger_trip_receipt: { html: string } = { html: null }
    private muver_trip_resume: { html: string } = { html: null }

    public realizar_pago = async (req: Request, res: Response) =>
    {
        const errors = validationResult( req )
        if ( !errors.isEmpty() )
            return res.status( UNPROCESSABLE_ENTITY ).json({ errors: errors.array() })
        
        await render( this.passenger_trip_resume_invoice_template_path, req.body )
            .then( (html: string) => this.passenger_trip_invoice.html = html)
            .catch( (err: Error) => { throw err })

        await render( this.passenger_trip_receipt_invoice_template_path, req.body )
            .then( (html: string) => this.passenger_trip_receipt.html = html)
            .catch( (err: Error) => { throw err })

        await render( this.muver_trip_resume_template_path, req.body )
            .then( (html: string) => this.muver_trip_resume.html = html)
            .catch( (err: Error) => { throw err })

        const email = new Emailer

        if ( send_email_is_allowed_here )
            await email.send
            ({ 
                from: MailConfig.enterprise_email, 
                to: req.body.passenger_email, 
                subject: `Factura del Viaje MUV - ${req.body.date}`, 
                html: this.passenger_trip_invoice.html,
                text: "MUV",
            })
            .catch((error) => console.log("MAILGUN-ERROR=", error))

        if ( send_email_is_allowed_here )
            await email.send
            ({ 
                from: MailConfig.enterprise_email, 
                to: req.body.passenger_email, 
                subject: `Recibo de Factura Viaje MUV - ${req.body.date}`, 
                html: this.passenger_trip_receipt.html,
                text: "MUV",
            })
            .catch((error) => console.log("MAILGUN-ERROR=", error))

        if ( send_email_is_allowed_here )
            await email.send
            ({ 
                from: MailConfig.enterprise_email,
                to: req.body.muver_email, 
                subject: `Resumen de Viaje del Muver ${req.body.date}`, 
                html: this.muver_trip_resume.html,
                text: "MUV",
            })
            .then((result) => console.log("EMAIL-RECIBO-VIAJE-SUCCESS=", result))
            .catch((error) => console.log("MAILGUN-ERROR=", error))
        
    
        console.log( "END======>")
        Promise.resolve( res.sendStatus( OK ) )
    }



}
