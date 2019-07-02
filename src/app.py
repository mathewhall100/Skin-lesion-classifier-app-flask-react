# from __future__ import annotations # required for python3.7 
from fastai import *
from fastai.vision import *
import fastai
import yaml
import sys
from io import BytesIO
from typing import List, Dict, Union, ByteString, Any
import os
import flask
from flask import Flask
import requests
import torch
import json


# **** For heroku deployment ****
with open("src/config.yaml", 'r') as stream:
    APP_CONFIG = yaml.load(stream)

# **** local deployment ****
# with open("config.yaml", 'r') as stream:
#     APP_CONFIG = yaml.load(stream)

app = Flask(__name__)


#  **** For heroku deployment ****
def load_model(path=".", model_name="model.pkl"):
    learn = load_learner("models", model_name)
    return learn

# **** local deployment ****
# def load_model(path=".", model_name="model.pkl"):
#     learn = load_learner("../models", model_name)
#     return learn


def load_image_url(url: str) -> Image:  # function annotation syntax 
    response = requests.get(url)
    img = open_image(BytesIO(response.content))
    return img


def load_image_bytes(raw_bytes: ByteString) -> Image:
    img = open_image(BytesIO(raw_bytes))
    return img

# **** binary classification problem ****
def predict(img):
    pred_class, pred_idx, outputs = model.predict(img)
    print(f'pred-class {pred_class}')
    print(f'pred-idx {pred_idx}')
    print(f'outputs {outputs}')
    pred_probs = outputs / sum(outputs)
    pred_probs = pred_probs.tolist()
    predictions = []
    for image_class, output, prob in zip(model.data.classes, outputs.tolist(), pred_probs):
        print(f'imageclaSS: {image_class}')
        print(f'output: {output}')
        print(f'prob: {prob}')
        output = round(output, 1)
        prob = round(prob, 2)
        predictions.append(
            {"class": image_class, "output": output, "prob": prob}
        )
    predictions = sorted(predictions, key=lambda x: x["output"], reverse=True)
    predictions = predictions[0:3]
    return {"class": str(pred_class), "predictions": predictions}

# **** multiclass problem ****
# def predict(img, n: n= 3) -> Dict[str, Union[str, List]]:
#     pred_class, pred_idx, outputs = model.predict(img)
#     print(f'pred-class {pred_class}')
#     print(f'pred-idx {pred_idx}')
#     print(f'outputs {outputs}')
#     pred_probs = outputs / sum(outputs)
#     pred_probs = pred_probs.tolist()
#     predictions = []
#     for image_class, output, prob in zip(model.data.classes, outputs.tolist(), pred_probs):
#         print(f'imageclaSS: {image_class}')
#         output = round(output, 1)
#         prob = round(prob, 2)
#         predictions.append(
#             {"class": image_class.replace("_", " "), "output": output, "prob": prob}
#         )

#     predictions = sorted(predictions, key=lambda x: x["output"], reverse=True)
#     predictions = predictions[0:n]
#     return {"class": str(pred_class), "predictions": predictions}


@app.route('/api/classify', methods=['POST', 'GET'])
def upload_file():
    
    if flask.request.method == 'GET':
        # load example image
        url = flask.request.args.get("url")
        img = load_image_url(url)
    else:
        # upload new test image
        bytes = flask.request.files['file'].read()
        img = load_image_bytes(bytes)
        print(f'img: {img}')
    # run prediction on image
    res = predict(img)
    return flask.jsonify(res)


@app.route('/api/classes', methods=['GET'])
def classes():
    classes = sorted(model.data.classes)
    return flask.jsonify(classes)


@app.route('/ping', methods=['GET'])
def ping():
    return "pong"


@app.route('/config')
def config():
    return flask.jsonify(APP_CONFIG)


@app.after_request
def add_header(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"

    response.cache_control.max_age = 0
    return response


@app.route('/<path:path>')
def static_file(path):
    if ".js" in path or ".css" in path:
        return app.send_static_file(path)
    else:
        return app.send_static_file('index.html')


@app.route('/')
def root():
    return app.send_static_file('index.html')


def before_request():
    app.jinja_env.cache = {}


model = load_model('models')

if __name__ == '__main__':
    port = os.environ.get('PORT', 5000)

    if "prepare" not in sys.argv:
        app.jinja_env.auto_reload = True
        app.config['TEMPLATES_AUTO_RELOAD'] = True
        app.run(debug=False, host='0.0.0.0', port=port) # debug off
        # app.run(host='0.0.0.0', port=port) 
