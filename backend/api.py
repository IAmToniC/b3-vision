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
    return jsonify({"message": query()})

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
