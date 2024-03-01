import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
import { auth } from "../middleware/auth.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const messagesRouter = Router();

// messagesRouter.use(auth);

messagesRouter.get("/:conversationId", async (req, res) => {
  let { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", req.params.conversationId);

  if (error) {
    return res.status(500).json(error);
  }
  return res.status(200).json({ messages, error });
});

messagesRouter.post("/", async (req, res) => {
  const message = req.body;
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: message.conversation_id,
      sender_id: message.sender_id,
      message_text: message.message_text,
    })
    .select();

  await supabase
    .from("conversation")
    .update({ updated_at: new Date(message.updated_at) })
    .eq("id", message.conversation_id);
  if (error) {
    return res.status(500).json(error);
  }

  return res.status(200).json(data);
});

messagesRouter.post("/images", upload.array("messages"), async (req, res) => {
  const message = req.body;
  const images = req.files[0];

  const fileExtension = images.originalname.split(".").pop();
  const fileName = `profile-${uuidv4()}.${fileExtension}`;

  const { data: imagesUpload, error: UploadError } = await supabase.storage
    .from("images/messages")
    .upload(fileName, images.buffer, {
      contentType: images.mimetype,
    });
  if (UploadError) {
    return res.status(400).json({ message: UploadError });
  }
  const { data: url } = supabase.storage
    .from("images/messages")
    .getPublicUrl(fileName);

  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: message.conversation_id,
      sender_id: message.sender_id,
      message_text: url.publicUrl,
    })
    .select();

  await supabase
    .from("conversation")
    .update({ updated_at: new Date(message.updated_at) })
    .eq("id", message.conversation_id);

  if (error) {
    return res.status(500).json(error);
  }

  return res.status(200).json(data);
});

export default messagesRouter;
