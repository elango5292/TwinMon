from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

with open('model/ln_model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    predata = data["data"]
    print(data["data"])
    prediction = model.predict(data["data"])
    rounded = np.round(prediction)
    return jsonify({'prediction': rounded.tolist()})


# X = data[['Nozzle Temperature (C)', 'Bed Temperature (C)', 'Fan Speed (RPM)', 'Print Speed (mm/s)']]
# y = data[['Warping', 'Nozzle Clogging', 'Over Extrusion', 'Under Extrusion']]
# Warping, Nozzle Clogging, Over Extrusion, Under Extrusion, Stringing, Poor Adhesion


@app.route('/', methods=['GET'])
def home():
    
    return "Hello world"

if __name__ == '__main__':
    app.run(debug=True)