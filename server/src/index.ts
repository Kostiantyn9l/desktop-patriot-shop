import "dotenv/config";
import express, {type Express, type Request, type Response} from "express"

const app:Express = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req:Request, res:Response) => {
    res.send("Working");
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});