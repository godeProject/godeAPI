# -*- coding: utf-8 -*-

import flask
from flask import request, jsonify
from qwkm import qwkm, spl


app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config['JSON_AS_ASCII'] = False

@app.route('/', methods=['GET'])
def home():
    return '''<h1>g;ode api</h1>
<p>An API for converting gibberish caused by Thai user forgetting to change keybord layout.</p><a href="https://github.com/gxjakkap/godeapi">Click here to go to g;ode API GitHub Page.</a>'''

@app.route('/api/v1/getans', methods=['GET'])
def api_id():
    if 'phrase' in request.args:
        phrase = str(request.args['phrase'])
    else:
        return "Error: Missing Argument."
    return jsonify(
        results=qwkm(phrase)
    )

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000, url_scheme='https')
    