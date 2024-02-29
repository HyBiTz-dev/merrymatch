import { supabase } from "./utils/supabaseClient.js";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cron from "node-cron";
import dotenv from "dotenv";

//Router API
import messagesRouter from "./apps/messages.js";
import packagesRouter from "./apps/packages.js";
import authRouter from "./apps/auth.js";
import registerRouter from "./apps/register.js";
import conversationRouter from "./apps/conversation.js";
import userRouter from "./apps/user.js";
import complaintRouter from "./apps/complaint.js";
import merryListRouter from "./apps/merryList.js";
import payment1Router from "./apps/payment1.js";
import transactionRouter from "./apps/transaction.js";
import membershipRouter from "./apps/membership.js";

async function init() {
  const app = express();
  const port = 3000;
  dotenv.config();

  const server = createServer(app);

  const io = new Server(server, {
    cors: {
<<<<<<< HEAD
      origins: process.env.BASE_URL_CLIENT,
=======
      origin: process.env.BASE_URL_CLIENT,
>>>>>>> 3a3758c (fix:resovle cors allow error)
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(bodyParser.json());
  app.use(cors());
  app.use("/messages", messagesRouter);
  app.use("/packages", packagesRouter);
  app.use("/payment1", payment1Router);
  app.use("/transaction", transactionRouter);
  app.use("/membership", membershipRouter);
  app.use("/login", authRouter);
  app.use("/register", registerRouter);
  app.use("/conversation", conversationRouter);
  app.use("/user", userRouter);
  app.use("/filing-complaint", complaintRouter);
  app.use("/merrylist", merryListRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  cron.schedule(
    "0 0 * * *",
    async () => {
      const { error } = await supabase
        .from("merry_limit")
        .update({ daily_limit: 0 })
        .gt("daily_limit", 0);
      console.log("reset daily limit");
    },
    {
      scheduled: true,
      timezone: "Asia/Bangkok",
    }
  );

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

  let users = [];

  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    socket.on("sendMessages", ({ senderId, receiverId, messages }) => {
      const user = getUser(receiverId);
      if (user) {
        io.to(user.socketId).emit("getMessage", {
          senderId,
          messages,
        });
      }
    });

    socket.on("merryMatch", ({ matchId, senderMatchId, name, img }) => {
      const user = getUser(matchId);
      if (user) {
        const data = { matchId, senderMatchId, name, img };
        io.to(user.socketId).emit("notification", data);
      }
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });

  server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

init();
