import { Router, Request, Response } from 'express'
import RequestHelper from './RequestHelper.js'
import StatusCodes from './StatusCodes.js'
import AccountHandler from './AccountHandler.js'

const router: Router = Router()

router.post('/info', (req: Request, res: Response) => {
    // verify user
    // get balance
    // get latest transaction
    // format chart correctly
    // give it to handelbars
    // render to user, maybe redirect him
})

router.post('/register', async (req, res) => { // TODO check for keys
    if (!RequestHelper.hasKeys(['uuid', 'pin'], req.body) || req.body.uuid.length > 36) { res.status(StatusCodes.error.badRequest).send() }
    if (!/^[0-9]{4}/.test(req.body.pin)) { return StatusCodes.error.pinFormat }

    res.status(await AccountHandler.addUser(req.body.uuid, req.body.pin)).send()
})

router.post('/transaction', async (req, res) => {
    if (!RequestHelper.hasKeys(['fromUUID', 'toUUID', 'fromPIN', 'amount'], req.body)) {  res.status(StatusCodes.error.badRequest).send() }

    res.status((await AccountHandler.newTransaction(req.body.fromUUID, req.body.toUUID, req.body.fromPIN, req.body.amount))).send()
})

export default router