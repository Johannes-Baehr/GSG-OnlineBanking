import express, {Express, Request, Response} from "express"

const app: Express = express()
let port: number = 8080

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})


