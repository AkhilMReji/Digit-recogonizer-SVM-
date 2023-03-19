from flask import Flask , render_template, request, redirect, url_for 
from PIL import Image
from io import BytesIO
import pickle
import base64
import numpy as np 
import matplotlib.pyplot as plt
from sklearn.preprocessing import scale

model = pickle.load(open('../modelfile/model_rbf.pkl','rb'))

def postvalue(data):
    
    decoded_data=base64.b64decode((data[22:]))
    img = Image.open(BytesIO(decoded_data))
    data =  np.asarray(img)
    im = Image.fromarray(data[:,:,3])
    im = im.resize((28,28))
    im.save('imag1.png')
    X_data = np.asarray(im)
    X_data = X_data/255
    X_data=scale(X_data)
    X_data = X_data.reshape((-1,784))
    prediction = model.predict(X_data) 
    flag=prediction[0]
    return flag