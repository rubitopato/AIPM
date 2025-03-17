import cv2
import numpy as np

def recortar_imagen(imagen_path, img_size = (224,224)):
    img = cv2.imread(imagen_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, img_size)
    img = np.expand_dims(img, axis=0)
    return img