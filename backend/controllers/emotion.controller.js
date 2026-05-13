const { predecirEmocion } = require("../services/flask.service");
const { detectarPorReglas } = require("../services/emotionRules.service");
const { generarRespuestaEmocional } = require("../services/generative.service");
const { generarAudioElevenLabs } = require("../services/elevenlabs.service");

const analizarEmocion = async (req, res) => {
  try {
    const { texto, voz } = req.body;

    if (!texto || !texto.trim()) {
      return res.status(400).json({
        error: true,
        mensaje: "El texto es obligatorio.",
      });
    }

    const prediccionBert = await predecirEmocion(texto);
    const reglaDetectada = detectarPorReglas(texto);

    let resultadoFinal;

    if (reglaDetectada) {
      resultadoFinal = {
        clase_modelo: prediccionBert.clase,
        emocion_modelo: prediccionBert.emocion,
        confianza_modelo: prediccionBert.confianza,
        emocion: reglaDetectada.emocion,
        problema: reglaDetectada.problema,
        recomendaciones: reglaDetectada.recomendaciones,
        coincidencias: reglaDetectada.coincidencias,
        origen: "modelo_bert + reglas_nlp",
      };
    } else {
      resultadoFinal = {
        clase_modelo: prediccionBert.clase,
        emocion_modelo: prediccionBert.emocion,
        confianza_modelo: prediccionBert.confianza,
        emocion: prediccionBert.emocion === "estres" ? "estres" : "calma",
        problema:
          prediccionBert.emocion === "estres"
            ? "Posible estrés emocional o presión acumulada"
            : "No se detectan señales claras de malestar emocional",
        recomendaciones:
          prediccionBert.emocion === "estres"
            ? [
                "Haz una pausa breve.",
                "Respira profundamente.",
                "Organiza tus pendientes por prioridad.",
              ]
            : ["Mantén hábitos saludables.", "Continúa cuidando tu descanso."],
        coincidencias: [],
        origen: "modelo_bert",
      };
    }

    const respuestaIA = await generarRespuestaEmocional({
      textoUsuario: texto,
      emocion: resultadoFinal.emocion,
      problema: resultadoFinal.problema,
      recomendaciones: resultadoFinal.recomendaciones,
    });

    resultadoFinal.respuesta_ia = respuestaIA;
    resultadoFinal.texto_narracion = respuestaIA;

    let audioResult = {
      audio_disponible: false,
      audio: null,
    };

    if (voz === true) {
      audioResult = await generarAudioElevenLabs(respuestaIA);
    }

    resultadoFinal.audio_disponible = audioResult.audio_disponible;
    resultadoFinal.audio = audioResult.audio;

    return res.json({
      error: false,
      entrada: texto,
      resultado: resultadoFinal,
    });
  } catch (error) {
    console.error("Error en analizarEmocion:", error);

    return res.status(500).json({
      error: true,
      mensaje: error.message,
    });
  }
};

module.exports = {
  analizarEmocion,
};