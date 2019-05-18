
import { check, ValidationChain, ValidatorOptions } from "express-validator/check"

export default (method: string, enabled: boolean = true): ValidationChain[] =>
{
  if ( !enabled )
    return []

  let validator: ValidationChain[] = []

  switch ( method ) 
  {
    case "realizar_pago": 
      validator = 
      [
        check("payment_method")
          .isIn(["CASH", "TIGO_MONEY", "BILLETERA_PERSONAL", "CARD", "BUSINESS"])
            .withMessage("El metodo de pago no se reconoce")
          .exists().withMessage("El metodo de pago es requerido"),

        check("accepted")
          .isBoolean()
          .exists().withMessage("La aceptación es requerida"),

        check("passenger_name")
          .exists().withMessage("El nombre del pasajero es requerido")
          .isString().withMessage("El nombre del pasajero debe ser letras"),

        check("muver_name")
          .exists().withMessage("El nombre del muver es requerido")
          .isString().withMessage("El nombre del muver debe ser letras"),
          
        check("passenger_email")
          .exists().withMessage("El email del pasajero es requerido")
          .isEmail().withMessage("El email del pasajero no es valido"),

        check("muver_email")
          .exists().withMessage("El email del muver es requerido")
          .isEmail().withMessage("El email del muver no es valido"),

        check("vehicle_category")
          .exists().withMessage("La categoría del vehiculo es requerida")
          .isIn(["STANDARD", "PREMIUM", "XL"]).withMessage("La categoría del vehiculo no es valida"),

        check("total")
          .isNumeric().withMessage("El total debe ser numérico"),

        check("rating")
          .isNumeric().withMessage("El rating debe ser numérico")
          .exists().withMessage("El rating es requerido"),

        check("comment")
          .optional()
          .isString().withMessage("El comentario debe ser palabras"),
          
        check("date")
          .exists().withMessage("La fecha de viaje es requerida"),        
      ]
      break
    
  }

  return validator
}
