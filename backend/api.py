from flask import Flask, jsonify, request
from main import query
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

client = MongoClient(os.getenv("MONGO_URI"))
db = client['b3_vision']
users_collection = db['users'] 

@app.before_request
def handle_options():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        headers = response.headers
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        headers['Access-Control-Allow-Headers'] = request.headers.get('Access-Control-Request-Headers', '*')
        return response

@app.route("/api/get_analysis", methods=["GET"])
def get_analysis():
    user_email = request.args.get("email")
    user = users_collection.find_one({"email": user_email})
    if user and "investmentProfile" in user:
        investment_profile_data = user["investmentProfile"]
    else:
        investment_profile_data = None
    
    return jsonify({"message": query(investment_profile_data)})

@app.route("/api/register", methods=["POST"])
def register():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({"message": "Email e senha são obrigatórios!"}), 400
        
        if users_collection.find_one({"email": email}):
            return jsonify({"message": "Usuário já cadastrado!"}), 400
        
        users_collection.insert_one({"email": email, "password": password})
        return jsonify({"message": "Usuário registrado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"message": f"Erro interno: {str(e)}"}), 500


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({"email": email, "password": password})
    if user:
        return jsonify({"message": "Login bem-sucedido!"}), 200
    else:
        return jsonify({"message": "Credenciais inválidas!"}), 401

@app.route("/api/investment-profile", methods=["POST"])
def investment_profile():
    try:
        data = request.json
        required_fields = [
            "investmentMotivation", "investmentGoal", "investmentAssets", "investmentExperience", 
            "riskTolerance", "investmentSectors", "investmentStrategy", "emergencyFund", 
            "marketMonitoring", "decisionMaking"
        ]
        
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"message": f"Campos obrigatórios ausentes: {', '.join(missing_fields)}"}), 400
        
        email = data.get("email")
        if not email:
            return jsonify({"message": "Campo 'email' é obrigatório!"}), 400
        
        users_collection.update_one(
            {"email": email},
            {"$set": {"investmentProfile": data}},
            upsert=True
        )
        
        return jsonify({"message": "Perfil de investimento salvo com sucesso!"}), 201
    
    except Exception as e:
        return jsonify({"message": f"Erro interno: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)