from flask import Flask , render_template, request, redirect,  jsonify 
from PIL import Image
from io import BytesIO
import pickle
import base64
import numpy as np 
import matplotlib.pyplot as plt
from model_pass import postvalue

app = Flask(__name__)



@app.route('/',methods=['GET','POST'])
def hello():
     if(request.method=='GET'):
        return render_template('index.html',name="ypui")
     else:
         value=request.data
         data=postvalue(value)
         print("the data value- "+ str(data))
         result={'data':str(data),'message':'data process successfully'}
         return jsonify(result)
        

if __name__=='__main__':
    app.debug=True
    app.run(host='0.0.0.0',port =5000)