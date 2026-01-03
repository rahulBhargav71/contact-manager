import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.post("/api/contacts", async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
});

export default app;
