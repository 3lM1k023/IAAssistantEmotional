import os
import torch

from transformers import (
    BertTokenizer,
    BertForSequenceClassification
)

print("Cargando modelo BERT...")

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "mejor_modelo_bert_cv"
)

MAX_LENGTH = 96

ID2LABEL = {
    0: "calma",
    1: "estres",
    2: "ansiedad",
    3: "tristeza",
    4: "enojo",
    5: "alegria"
}

MENSAJES = {
    "calma": "Detecto un estado emocional estable.",
    "estres": "Detecto señales de estrés o presión emocional.",
    "ansiedad": "Detecto señales de ansiedad o preocupación.",
    "tristeza": "Detecto señales de tristeza o desánimo.",
    "enojo": "Detecto señales de enojo o frustración.",
    "alegria": "Detecto señales de bienestar o alegría."
}

RECOMENDACIONES = {
    "calma": "Mantén hábitos saludables y continúa cuidando tu bienestar.",
    "estres": "Haz una pausa breve y organiza tus pendientes por prioridad.",
    "ansiedad": "Respira lentamente y evita sobrepensar escenarios negativos.",
    "tristeza": "Busca apoyo emocional y permite expresar lo que sientes.",
    "enojo": "Respira profundo antes de responder impulsivamente.",
    "alegria": "Aprovecha esta energía positiva en tus actividades."
}

device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

tokenizer = BertTokenizer.from_pretrained(
    MODEL_PATH
)

model = BertForSequenceClassification.from_pretrained(
    MODEL_PATH
)

model.to(device)

model.eval()


def predecir_texto(texto):

    if not texto or not texto.strip():

        raise ValueError(
            "El texto no puede estar vacío."
        )

    inputs = tokenizer(
        texto,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=MAX_LENGTH
    )

    inputs = {
        k: v.to(device)
        for k, v in inputs.items()
    }

    with torch.no_grad():

        outputs = model(**inputs)

        logits = outputs.logits

        probs = torch.softmax(
            logits,
            dim=1
        )

        confianza, clase_predicha = torch.max(
            probs,
            dim=1
        )

    clase = int(
        clase_predicha.item()
    )

    confianza = float(
        confianza.item()
    )

    emocion = ID2LABEL.get(
        clase,
        f"clase_{clase}"
    )

    mensaje = MENSAJES.get(
        emocion,
        "Emoción detectada."
    )

    recomendacion = RECOMENDACIONES.get(
        emocion,
        "Cuida tu bienestar emocional."
    )

    return {
        "clase": clase,
        "emocion": emocion,
        "confianza": round(confianza, 4),
        "mensaje": mensaje,
        "recomendacion": recomendacion,
        "texto_narracion": f"{mensaje} {recomendacion}"
    }