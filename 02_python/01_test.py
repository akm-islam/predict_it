# chmod 644 01_test.py
from flask import Flask, render_template, request
from werkzeug import secure_filename
import os,glob,sys
import re
import json
from flask import jsonify, make_response
import pandas as pd
from sklearn.feature_selection import VarianceThreshold
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
#------------------------------------------------- Uploads are handled here
# This is where we set the path
app.config['UPLOAD_PATH']="./upload"
@app.route('/upload')
def upload_file1():
   return render_template('upload.html')
@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      files = glob.glob('./upload/*')
      for f in files:
         os.remove(f)
# request.files conatains (werkzeug.datastructures.FileStorage)  
      for f in request.files.getlist('file'): 
# f.save(arg1 is the path, arg2 is the filename)
         print(f.filename)
         f.save(os.path.join(app.config['UPLOAD_PATH'],  secure_filename(f.filename)))
      return 'file uploaded successfully'
#------------------------------------------------- Processing List of attributes request
@app.route('/json',methods=['POST','GET'])
def hello_world2():
    if(request.is_json):
        req=request.get_json();
        if(req.get("myrequest")=='data'):
            datasets_with_Attributes={}
            mypath='./upload/*.csv'
            for filename in glob.glob(mypath):
                df = pd.read_csv(filename)
                fname=re.sub(r'.csv', '',filename[9:])
                datasets_with_Attributes[fname]=df.columns.tolist()
            return make_response(jsonify(datasets_with_Attributes), 200)
    else:
        return make_response(jsonify({"message": "Else"}), 200)
#--------------------------------Main program starts here
if __name__ == '__main__':
   app.run(host='0.0.0.0')
   app.run(debug = True)

#https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Preflighted_requests
