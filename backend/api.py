from flask import Flask, jsonify
from actual import go
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/hello", methods=["GET"])
def hello():
    return jsonify({"message": "Hello, World!"})

@app.route("/api/get_analysis", methods=["GET"])
def get_analysis():
    return jsonify({"message": go()})
