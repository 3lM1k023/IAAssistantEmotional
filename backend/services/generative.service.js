const generarRespuestaIA = async (texto, contexto = "") => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return "Estoy aquí para escucharte. Cuéntame un poco más sobre cómo te sientes.";
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Eres Orbyn, un asistente emocional empático. Responde en español, con tono cálido, breve y útil. No des diagnósticos médicos.",
          },
          {
            role: "user",
            content: `${contexto}\n\nUsuario: ${texto}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 180,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error OpenAI:", data);
      return "Estoy aquí para apoyarte. No pude generar una respuesta avanzada en este momento, pero puedo acompañarte.";
    }

    return (
      data.choices?.[0]?.message?.content ||
      "Estoy aquí para escucharte. Cuéntame un poco más."
    );
  } catch (error) {
    console.error("Error en generarRespuestaIA:", error);
    return "Estoy aquí para apoyarte. Ocurrió un problema generando la respuesta.";
  }
};

module.exports = { generarRespuestaIA };