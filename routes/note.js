import express from "express";
import middleware from "../middleware/middleware.js";
import Note from "../models/note.js";

const router = express.Router();

router.post("/add", middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = new Note({
      title,
      description,
      userId: req.user.id,
    });

    await newNote.save();

    return res
      .status(200)
      .json({ success: true, message: "note successfully saved to mongoDB" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internel problem in adding notes" });
  }
});

router.get("/", middleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    return res
      .status(200)
      .json({ success: true, notes, message: "u get all notes" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "some internel problem in feactching the data",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ success: true, updateNote, message: "note updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "some internel problem in editing data ",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = await Note.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, deleteNote, message: "note deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "some internel problem in editing data ",
    });
  }
});

router.get("/verify", middleware, (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "verified", user: req.user });
});

export default router;
