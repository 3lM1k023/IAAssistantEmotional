const axios = require("axios");

const generarAudioElevenLabs = async (texto) => {
  try {
    if (!process.env.ELEVENLABS_API_KEY) {
      throw new Error("Falta ELEVENLABS_API_KEY en .env");
    }

    if (!process.env.ELEVENLABS_VOICE_ID) {
      throw new Error("Falta ELEVENLABS_VOICE_ID en .env");
    }

    const voiceId = process.env.ELEVENLABS_VOICE_ID;
    const modelId = process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: texto,
        model_id: modelId,
        voice_settings: {
          stability: 0.45,
          similarity_boost: 0.8,
        },
      },
      {
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        responseType: "arraybuffer",
      }
    );

    const audioBase64 = Buffer.from(response.data).toString("base64");

    return {
      audio_disponible: true,
      audio: {
        formato: "mp3",
        base64: audioBase64,
      },
    };
  } catch (error) {
    console.error(
      "Error ElevenLabs:",
      error.response?.data || error.message
    );

    return {
      audio_disponible: false,
      audio: null,
    };
  }
};

module.exports = {
  generarAudioElevenLabs,
};