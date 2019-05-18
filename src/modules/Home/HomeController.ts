import { Request, Response } from "express"

export default class HomeController 
{
    public index(req: Request, res: Response) 
    {
        
        const resp: any = {}
        resp.request = req.body
        resp.hello = "world"
        resp.message = "HomeController>index"
        res.json(resp)

    }
}
