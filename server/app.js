import { supabase } from "./utils/supabaseClient.js";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "node:http";

//Router API
import messagesRouter from "./apps/messages.js";
import packagesRouter from "./apps/packages.js";
import authRouter from "./apps/auth.js";
import registerRouter from "./apps/register.js";
import conversationRouter from "./apps/conversation.js";
import userRouter from "./apps/user.js";
import complaintRouter from "./apps/complaint.js";

async function init() {
  const app = express();
  const port = 3000;

  const server = createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(bodyParser.json());
  app.use(cors());
  app.use("/messages", messagesRouter);
  app.use("/packages", packagesRouter);
  app.use("/login", authRouter);
  app.use("/register", registerRouter);
  app.use("/conversation", conversationRouter);
  app.use("/user", userRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

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

  app.post("/package", async (req, res) => {
    const { packageName, price, merryLimit, packageIcon, details } = req.body;
    if (!packageName || price < 1 || !merryLimit || !packageIcon || !details) {
      res.status(400).json({ error: "Please fill all fields" });
      return;
    }
    try {
      const data = {
        name: packageName,
        price,
        package_icon: packageIcon,
        merry_limit: merryLimit,
        details,
      };
      const { error } = await supabase.from("packages").insert(data);
      if (error) {
        throw error;
      } else {
        res
          .status(201)
          .json({ message: "package has been created successfully" });
      }
    } catch (error) {
      console.error("Error creating package:", error.message);
      res
        .status(500)
        .json({ error: "Internal server error", message: error.message });
    }
  });

  app.delete("/package/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const { error } = await supabase.from("packages").delete().eq("id", id);
      if (error) throw error;
      res.json({ message: "Package has deleted" });
    } catch (error) {
      console.error("Error deleting package:", error.message);
      res
        .status(500)
        .json({ error: "Internal server error", message: error.message });
    }
  });

  app.get("/package", async (req, res) => {
    try {
      const { data, error } = await supabase.from("packages").select("*");
      if (error) throw error;
      res.json(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      res
        .status(500)
        .json({ error: "Internal server error", message: error.message });
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

    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });

  server.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

init();
