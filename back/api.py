from flask import Flask, request, jsonify
import tensorflow as tf
from flask_cors import CORS
import os
from preprocessing import *
from model import *

app = Flask(__name__)
CORS(app)


UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/upload', methods=['POST'])
def upload_file():
   
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)
    print(f"Image saved {file_path}")

    img = preprocess_image(file_path) 

    model = tf.keras.models.load_model("./models/Model1.h5")

    disease, probability = make_prediction(img, model)

    return jsonify({
        'disease': disease,
        'probability': f" {probability*100:.2f}%"
    }), 200


@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'API is running'}), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)
