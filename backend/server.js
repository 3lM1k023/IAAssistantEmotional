require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const emotionRoutes = require("./routes/emotion.routes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "Backend funcionando correctamente",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/emotion", emotionRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});