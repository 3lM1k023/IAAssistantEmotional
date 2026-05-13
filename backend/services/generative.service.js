const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generarRespuestaEmocional = async ({
  textoUsuario,
  emocion,
  problema,
  recomendaciones
}) => {
  const prompt = `
Eres un asistente emocional llamado Orbyn.
Tu tarea es responder de forma empática, breve y segura.

Texto del usuario:
"${textoUsuario}"

Emoción detectada:
${emocion}

Problema posible:
${problema}

Recomendaciones base:
${recomendaciones.join(", ")}

Genera una respuesta en español con:
1. Validación emocional
2. Explicación breve del posible problema
3. 3 recomendaciones concretas
4. Cierre amable

No diagnostiques enfermedades.
No digas que eres psicólogo.
Si detectas riesgo grave, recomienda buscar ayuda profesional.
`;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt
  });

  return response.output_text;
};

module.exports = {
  generarRespuestaEmocional
};