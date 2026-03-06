import "dotenv/config";
import express, {type Express, type Request, type Response} from "express";
import cors from "cors";
import { prisma } from "./lib/prisma.js";
import rootRouter from "./routes/index.js";

const app:Express = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api', rootRouter);

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