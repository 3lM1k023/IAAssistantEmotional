const axios = require("axios");

const FLASK_URL =
  process.env.FLASK_URL || "http://localhost:5000";

const predecirEmocion = async (texto) => {

  try {

    const response = await axios.post(
      `${FLASK_URL}/predecir`,
      {
        texto
      }
    );

    return response.data;

  } catch (error) {

    console.error(error);

    throw new Error(
      "Error al comunicarse con Flask"
    );

  }

};

module.exports = {
  predecirEmocion
};