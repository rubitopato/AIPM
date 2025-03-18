import cv2
import tensorflow as tf
import numpy as np

clases = ['Acitinic Keratosis', 'Basal Cell Carcinoma', 'Dermatofibroma', 'Melanoma']


def process_prediction(prediction):
    print(f"Prediction: {prediction}")
    class_index = np.argmax(prediction)

    class_name = clases[class_index]

    probability = prediction[0][class_index]

    print(f"User may have: {class_name} with a probability of {probability*100:.2f}")

    return class_name, probability

def make_prediction(image, model):
    print(f"Image shape: {image.shape}")
    prediction = model.predict(image)

    class_name, probability = process_prediction(prediction)

    return class_name, probability