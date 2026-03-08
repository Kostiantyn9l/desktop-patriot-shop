import "dotenv/config";
import express, {type Express, type Request, type Response} from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import prisma from "./lib/prisma.js";
import rootRouter from "./routes/index.js";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

const app:Express = express();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use('/api', rootRouter);

app.use(errorHandler);

const start = async () => {
  try{
   await prisma.$connect();
   console.log("DB connected");

   app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
   });
  }catch(e){
    console.log("Server failed to start", e);
    process.exit(1);
  }
};

start();

const shutdown = async () => {
  console.log("Shutting down...");
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);