import { supabase } from "./utils/db.js";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

//Router API
import messagesRouter from "./apps/messages.js";
import packagesRouter from "./apps/packages.js";
import authRouter from "./apps/auth.js";

async function init() {
  const app = express();
  const port = 3000;

  app.use(bodyParser.json());
  app.use(cors());
  app.use("/messages", messagesRouter);
  app.use("/packages", packagesRouter);
  app.use("/login", authRouter);

  app.get("/login", async (req, res) => {
    try {
      const { data, error } = supabase.auth.onAuthStateChange(
        (event, session) => {
          console.log(event, session);
        }
      );
      return res.send({ data });
    } catch (error) {
      console.log({ error });
      return res.send({ error });
    }
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

init();
