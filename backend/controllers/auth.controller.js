const db = require("../config/db");

const testAuth = async (req, res) => {

  try {

    const [rows] = await db.query(
      "SELECT * FROM usuarios"
    );

    res.json({
      mensaje: "Conexión MySQL exitosa",
      usuarios: rows
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error conectando con MySQL"
    });

  }

};

module.exports = {
  testAuth
};