require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");
const plaidRoutes = require("./routes/plaid");

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://main--roaring-tartufo-208ab1.netlify.app", // Netlify deployment
  "https://your-vercel-app-url.vercel.app", // Add your Vercel frontend if needed
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(
          new Error("❌ CORS policy does not allow access from this origin")
        );
      }
    },
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/plaid", plaidRoutes);


const PORT = process.env.PORT || 3002;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.get("/", (req, res) => {
      res.send("✅ Budget Tracker API is running!");
    });



    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error("❌ MongoDB Connection Error:", err));
