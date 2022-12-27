import express from "express";
import bodyParser from "body-parser";
import account from "./AccountRouter.js";
const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use('/account', account);
app.use(express.static("dist/static")); // TODO: weird things happening and i dont have any idea whats going on with that path
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
export default app;
