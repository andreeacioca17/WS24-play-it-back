const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || "*",
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/games");

app.use("/auth", authRoutes);
app.use("/games", gameRoutes);

// MongoDB connection
const mongoURI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/PlayItBack";



mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4, // For Maya connection
  })
  .then(() => {
    console.log("Connected to MongoDB");

    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection Error:", err);
  });
