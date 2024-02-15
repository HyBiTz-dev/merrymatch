import { supabase } from "./utils/supabaseClient.js";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

//Router API
import messagesRouter from "./apps/messages.js";
import packagesRouter from "./apps/packages.js";
import authRouter from "./apps/auth.js";
import registerRouter from "./apps/register.js";
import complaintRouter from "./apps/complaint.js";

async function init() {
  const app = express();
  const port = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(bodyParser.json());
  app.use(cors());
  app.use("/messages", messagesRouter);
  app.use("/packages", packagesRouter);
  app.use("/login", authRouter);
  app.use("/register", registerRouter);
  app.use("/filing-complaint", complaintRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

init();
