import "dotenv/config";
import express, { Router } from "express";
import { Database } from "./common/Database";

const PORT = process.env.PORT;

(async ()=> {
  const server = express();
  const apiRouter = Router();

  apiRouter.use(express.json());

  server.use("/api", apiRouter);

  await Database.connect();

  server.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
  })
})()
