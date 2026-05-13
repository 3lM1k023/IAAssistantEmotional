require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensaje: "Backend funcionando correctamente" });
});

app.use("/api/auth", authRoutes);

// ← Esta línea es la que faltaba
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
}).on("error", (err) => {
  console.error("Error al iniciar servidor:", err.message);
});

process.on("uncaughtException", (err) => console.error("UncaughtException:", err));
process.on("unhandledRejection", (err) => console.error("UnhandledRejection:", err));