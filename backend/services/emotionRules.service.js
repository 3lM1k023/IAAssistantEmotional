const reglas = [
  {
    emocion: "depresion",
    problema: "Posibles señales depresivas o tristeza profunda",
    keywords: [
      "me deprimo",
      "deprimido",
      "deprimida",
      "depresion",
      "depresión",
      "no quiero hacer nada",
      "sin ganas",
      "desmotivado",
      "desmotivada",
      "sin energía",
      "sin energia",
      "no tengo energía",
      "no tengo energia",
      "cansado emocionalmente",
      "agotado emocionalmente",
      "sin motivación",
      "sin motivacion",
      "me siento vacío",
      "me siento vacio",
      "nada tiene sentido",
      "ya no disfruto",
      "me siento solo",
      "me siento sola"
    ],
    recomendaciones: [
      "Busca hablar con alguien de confianza.",
      "Intenta realizar una actividad pequeña y sencilla.",
      "No te aísles completamente.",
      "Si esta sensación continúa, considera buscar apoyo profesional."
    ]
  },
  {
    emocion: "ansiedad",
    problema: "Posibles señales de ansiedad o preocupación constante",
    keywords: [
      "ansioso",
      "ansiosa",
      "ansiedad",
      "preocupado",
      "preocupada",
      "nervioso",
      "nerviosa",
      "miedo",
      "pánico",
      "panico",
      "sobrepienso",
      "no puedo dormir",
      "me cuesta respirar"
    ],
    recomendaciones: [
      "Respira lentamente durante 2 minutos.",
      "Identifica qué pensamiento te está preocupando.",
      "Evita anticipar escenarios negativos.",
      "Haz una pausa y concéntrate en el presente."
    ]
  },
  {
    emocion: "enojo",
    problema: "Posibles señales de enojo, frustración o irritabilidad",
    keywords: [
      "enojado",
      "enojada",
      "molesto",
      "molesta",
      "ira",
      "rabia",
      "furioso",
      "furiosa",
      "frustrado",
      "frustrada",
      "irritado",
      "irritada"
    ],
    recomendaciones: [
      "Toma distancia antes de responder.",
      "Respira profundo y baja el ritmo.",
      "Evita tomar decisiones impulsivas.",
      "Canaliza la energía con una caminata breve."
    ]
  },
  {
    emocion: "tristeza",
    problema: "Posible tristeza o desánimo",
    keywords: [
      "triste",
      "tristeza",
      "llorar",
      "lloro",
      "ganas de llorar",
      "desánimo",
      "desanimo",
      "desanimado",
      "desanimada",
      "bajoneado",
      "bajoneada",
      "melancólico",
      "melancolica"
    ],
    recomendaciones: [
      "Permítete expresar lo que sientes.",
      "Escribe cómo te sientes.",
      "Haz una actividad ligera que disfrutes.",
      "Busca apoyo emocional si lo necesitas."
    ]
  }
];

const detectarPorReglas = (texto) => {
  const textoLower = texto.toLowerCase();

  for (const regla of reglas) {
    const coincidencias = regla.keywords.filter((kw) =>
      textoLower.includes(kw)
    );

    if (coincidencias.length > 0) {
      return {
        emocion: regla.emocion,
        problema: regla.problema,
        recomendaciones: regla.recomendaciones,
        coincidencias
      };
    }
  }

  return null;
};

module.exports = {
  detectarPorReglas
};