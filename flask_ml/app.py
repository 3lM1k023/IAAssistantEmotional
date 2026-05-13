from flask import Flask, request, jsonify
from flask_cors import CORS
from services.model_service import predecir_texto

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "mensaje": "Servicio ML funcionando correctamente"
    })


@app.route("/predecir", methods=["POST"])
def predecir():
    try:
        if not request.is_json:
            return jsonify({
                "error": True,
                "mensaje": "La petición debe ser JSON."
            }), 400

        data = request.get_json()
        texto = data.get("texto", "")

        resultado = predecir_texto(texto)

        return jsonify({
            "error": False,
            **resultado
        }), 200

    except ValueError as e:
        return jsonify({
            "error": True,
            "mensaje": str(e)
        }), 400

    except Exception as e:
        return jsonify({
            "error": True,
            "mensaje": "Error interno en el modelo.",
            "detalle": str(e)
        }), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)