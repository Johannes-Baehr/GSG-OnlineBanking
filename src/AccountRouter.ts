import { Router, Request, Response } from 'express'
import RequestHelper from './RequestHelper.js'
import StatusCodes from './StatusCodes.js'
import AccountHandler from './AccountHandler.js'
import TransactionLog from './TransactionLog.js'
import fs from 'fs'

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
    if (!RequestHelper.hasKeys(['fromUUID', 'toUUID', 'fromPIN', 'amount'], req.body)) { res.status(StatusCodes.error.badRequest).send() }

    res.status((await AccountHandler.newTransaction(req.body.fromUUID, req.body.toUUID, req.body.fromPIN, req.body.amount))).send()
})

router.get('/login', async (req, res) => {
    // if (!RequestHelper.hasKeys(['uuid', 'pin'], req.body)) { res.status(StatusCodes.error.authFail) }

    // const transations = await TransactionLog.getTransactions(req.body.uuid)
    // const chartData = await TransactionLog.processTransactions(transations, req.body.uuid)
    fs.readFile('/home/john/Repos/GSG-OnlineBanking/dist/test_chart.html', "utf-8", (err, file) => {
        if (err) {
            res.status(StatusCodes.error.server)
            return console.log(err);
        }
        // file = file.replace('{{ data }}', JSON.stringify(chartData)) // replace yes but no idea how chart.js works lets goooooooooooooooo
        res.send(file)
    })

    // authenticate user
    // get user balance
    // get transations from the log and format correctly
})

export default router