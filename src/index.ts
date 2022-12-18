import express, {Express, Request, Response} from "express"
import bodyParser from "body-parser"
import account from "./AccountRouter.js"
import RequestHelper from "./RequestHelper.js"
import StatusCodes from './StatusCodes.js'


const app: Express = express()
const port: number = 8080

app.use(bodyParser.json())
app.use('/account', account)



app.get("/test", (req: Request, res: Response) => {
    if (!RequestHelper.isUndefined(req.body?.uuid) && (/^[A-Za-z0-9]{3,16}$/.test(req.body?.uuid))) { // TODO: check if its really json
        res.status(StatusCodes.success.success).send("yeah")
    } else {
        res.send('not valid')
    }
})

app.use(express.static("/home/john/Repos/GSG-OnlineBanking/src/static/")) // TODO: unhardcode path

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

export default app




