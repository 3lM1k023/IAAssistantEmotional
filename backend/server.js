require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const emotionRoutes = require("./routes/emotion.routes");

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (
      origin === "http://localhost:5173" ||
      origin.endsWith(".vercel.app")
    ) {
      return callback(null, true);
    }

    return callback(new Error("No permitido por CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "Backend funcionando correctamente",
    env: process.env.NODE_ENV || "development",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    mensaje: "API activa",
  });
});

app.get("/api/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS conectado");
    res.json({
      ok: true,
      db: rows,
    });
  } catch (error) {
    console.error("Error DB:", error);
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/emotion", emotionRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});