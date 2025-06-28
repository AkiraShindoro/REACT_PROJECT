const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Required to parse JSON from POST body

// 🔥 Register this route

// After DB connect
connectDB().then(() => {
  const userRoutes = require("./routes/user"); // ✅ double-check this path
  const expenseRoutes = require("./routes/expenses");
  app.use("/api/users", userRoutes);
  app.use("/api/expenses", expenseRoutes);

  app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
  });
});
