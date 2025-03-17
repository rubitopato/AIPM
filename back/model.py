import cv2
import tensorflow as tf
import numpy as np

clases = ['Acitinic Keratosis', 'Basal Cell Carcinoma', 'Dermatofibroma', 'Melanoma']


def process_prediction(prediccion):
    # Obtener el índice de la clase con mayor probabilidad
    print(f"Predicción: {prediccion}")
    indice_clase = np.argmax(prediccion)

    # Obtener el nombre de la clase
    nombre_clase = clases[indice_clase]

    # Obtener la probabilidad de la clase predicha
    probabilidad = prediccion[0][indice_clase]

    print(f"El usuario tiene: {nombre_clase} con una probabilidad de {probabilidad*100:.2f}")

    return nombre_clase, probabilidad

def make_prediction(image, model):
    # Realizar la predicción
    print(f"Forma de la imagen: {image.shape}")
    prediccion = model.predict(image)

    # Procesar la predicción para obtener el nombre de la clase y la probabilidad
    nombre_clase, probabilidad = process_prediction(prediccion)

    return nombre_clase, probabilidad