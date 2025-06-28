const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const { ObjectId } = require("mongodb");


router.get("/", async (req, res) => {
  const db = getDB();

  if (!db) {
    return res.status(503).json({ error: "DB not ready yet" });
  }

  try {
    const expenses = await db.collection("expenses").find().toArray();
    res.json(expenses);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

router.post("/", async (req, res) => {
  const db = getDB();
if (!db) {
  return res.status(503).json({ error: "DB not ready yet" });
}

  try {
    const newExpense = req.body;

    const result = await db.collection("expenses").insertOne(newExpense);

    res.status(201).json({ ...newExpense, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Failed to add expense" });
  }
});

router.put("/:id", async (req, res) => {
  const db = getDB();
  if (!db) {
    return res.status(503).json({ error: "DB not ready yet" });
  }

  try {
    const { id } = req.params;
    const updatedExpense = req.body;

    delete updatedExpense._id; // ✅🔥 THIS IS MANDATORY

    const result = await db.collection("expenses").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedExpense }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json({ ...updatedExpense, _id: id });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update expense" });
  }
});



router.delete("/:id", async (req, res) => {
  const db = getDB();
if (!db) {
  return res.status(503).json({ error: "DB not ready yet" });
}

  try {
    const { id } = req.params;

    // Convert string to ObjectId ONLY if valid
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const result = await db.collection("expenses").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.status(204).end(); // No content
  } catch (error) {
    console.error("Delete error: ", error);
    res.status(500).json({ error: "Failed to delete expense" });
  }
});


module.exports = router;
