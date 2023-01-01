import express from "express";
import bodyParser from "body-parser";
import account from "./AccountRouter.js";
const app = express();
const port = 8080;
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', '/home/john/Repos/GSG-OnlineBanking/dist/views');
app.use('/account', account);
app.use(express.static("dist/static")); // TODO: weird things happening and i dont have any idea whats going on with that path
app.get('/rendertest', (req, res) => {
    res.render('index', { title: 'test title' });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
export default app;
