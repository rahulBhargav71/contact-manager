import express from "express";
import mongoose from "mongoose";
import Contact from "../../models/Contact.js"; // adjust path if needed

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// GET /api/contacts
app.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/contacts
app.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const contact = await Contact.create({ name, email, phone, message });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/contacts/:id
app.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;
