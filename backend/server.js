require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const emotionRoutes = require("./routes/emotion.routes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ia-assistant-emotional.vercel.app",
    "https://ia-assistant-emotional-bzf0i5qps.vercel.app",
    "https://ia-assistant-emotional-n2vq5f0he.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensaje: "Backend funcionando correctamente" });
});

app.use("/api/auth", authRoutes);
app.use("/api/emotion", emotionRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
}).on("error", (err) => {
  console.error("Error al iniciar servidor:", err.message);
});

process.on("uncaughtException", (err) =>
  console.error("UncaughtException:", err)
);

process.on("unhandledRejection", (err) =>
  console.error("UnhandledRejection:", err)
);