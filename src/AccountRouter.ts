import { Router, Request, Response } from 'express'
import RequestHelper from './RequestHelper.js'
import StatusCodes from './StatusCodes.js'

const router: Router = Router()

router.post('/info', (req: Request, res: Response) => {
    // verify user
    // get balance
    // get latest transaction
    // format correctly
    // send to user
})

router.post('/register', (req, res) => {
    if(RequestHelper.isValidBody(req.body)) {
        res.send('yeah')
    } else {
        res.status(StatusCodes.error.badRequest).send()
    }
})

export default router