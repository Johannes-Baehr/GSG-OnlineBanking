import e, { Router, Request, Response } from 'express'
import RequestHelper from './RequestHelper.js'
import StatusCodes from './StatusCodes.js'
import AccountHandler from './AccountHandler.js'
import TransactionLog from './TransactionLog.js'
import fs from 'fs'

const router: Router = Router()


router.post('/register', async (req, res) => {
    if (!RequestHelper.hasKeys(['uuid', 'pin'], req.body) || req.body.uuid.length > 36) { res.status(StatusCodes.error.badRequest).send() } else {
        console.log('after key check')
        if (!/^[0-9]{4}/.test(req.body.pin)) { return StatusCodes.error.pinFormat }

        res.status(await AccountHandler.addUser(req.body.uuid, req.body.pin)).send()
    }
})

router.post('/transaction', async (req, res) => {
    if (!RequestHelper.hasKeys(['fromUUID', 'toUUID', 'fromPIN', 'amount'], req.body)) { res.status(StatusCodes.error.badRequest).send() } else {
        res.status((await AccountHandler.newTransaction(req.body.fromUUID, req.body.toUUID, req.body.fromPIN, req.body.amount))).send()
    }
})

router.post('/login', async (req, res) => {
    if (RequestHelper.hasKeys(['uuid', 'pin'], req.body) === false) { res.status(StatusCodes.error.badRequest).send() } else {
        if (await AccountHandler.authenticate(req.body.uuid, req.body.pin) === StatusCodes.error.authFail) { res.status(StatusCodes.error.authFail).send() } else {

            const user: any = await AccountHandler.getBalance(req.body.uuid)

            if (user === StatusCodes.error.server) { res.send(StatusCodes.error.server) } else {

                const transations = await TransactionLog.getTransactions(req.body.uuid)
                const chartData = await TransactionLog.processTransactions(transations, req.body.uuid)
                fs.readFile('/home/john/Repos/GSG-OnlineBanking/dist/templates/dashboard.html', "utf-8", (err, file) => {
                    if (err) {
                        res.status(StatusCodes.error.server)
                        return console.log(err);
                    }
                    
                    file = file.replace('{{ balance }}', user.balance.toFixed(2))
                    file = file.replace('{{ data }}', JSON.stringify(chartData)) // replace yes but no idea how chart.js works lets goooooooooooooooo
                    res.send(file)
                })
            }
        }
    }
})

export default router