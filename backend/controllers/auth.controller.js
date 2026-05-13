const db = require("../config/db");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  console.log("📩 Petición recibida en /register");
  console.log("Body:", req.body);

  const { nombre, apellido, correo, password } = req.body;

  if (!nombre || !apellido || !correo || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    console.log("🔍 Verificando si el correo ya existe...");
    const [existe] = await db.query(
      "SELECT id_usuario FROM usuarios WHERE correo = ?",
      [correo]
    );
    console.log("✅ Consulta ejecutada. Resultado:", existe);

    if (existe.length > 0) {
      return res.status(409).json({ error: "El correo ya está registrado" });
    }

    console.log("🔐 Hasheando contraseña...");
    const hash = await bcrypt.hash(password, 10);
    console.log("✅ Hash generado");

    console.log("💾 Insertando usuario...");
    const [resultado] = await db.query(
      `INSERT INTO usuarios (nombre, apellido, correo, password, rol, estado)
       VALUES (?, ?, ?, ?, 'usuario', 1)`,
      [nombre, apellido, correo, hash]
    );
    console.log("✅ Usuario insertado con ID:", resultado.insertId);

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      id_usuario: resultado.insertId
    });

  } catch (error) {
    console.error("❌ ERROR en register:", error);
    return res.status(500).json({ error: error.message || "Error interno del servidor" });
  }
};

const login = async (req, res) => {
  console.log("📩 Petición recibida en /login");
  console.log("Body:", req.body);

  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: "Correo y contraseña son obligatorios" });
  }

  try {
    console.log("🔍 Buscando usuario...");
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE correo = ? AND estado = 1",
      [correo]
    );
    console.log("✅ Consulta ejecutada. Encontrados:", rows.length);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const usuario = rows[0];

    console.log("🔐 Comparando contraseña...");
    const coincide = await bcrypt.compare(password, usuario.password);
    console.log("✅ Coincide:", coincide);

    if (!coincide) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const { password: _, ...usuarioSinPassword } = usuario;

    return res.json({
      mensaje: "Login exitoso",
      usuario: usuarioSinPassword
    });

  } catch (error) {
    console.error("❌ ERROR en login:", error);
    return res.status(500).json({ error: error.message || "Error interno del servidor" });
  }
};

module.exports = { register, login };