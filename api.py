# -*- coding: utf-8 -*-

import flask
from flask_cors import CORS, cross_origin
from qwkm import qwkm
from log import log


app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config['JSON_AS_ASCII'] = False
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET'])
def home():
    return '''<h1>g;ode api</h1>
<p>An API for converting gibberish caused by Thai user forgetting to change keybord layout.</p><a href="https://github.com/gxjakkap/godeapi">Click here to go to g;ode API GitHub Page.</a>'''

@app.route('/api/v1/getans', methods=['GET'])
@cross_origin()
def api_id():
    if 'phrase' in flask.request.args:
        phrase = str(flask.request.args['phrase'])
    else:
        return flask.jsonify(
            status='400',
            Error='Missing Argument.'
        )
    ans = qwkm(phrase)
    print(log('qwkm', phrase, ans))
    return flask.jsonify(
        status='200',
        results=ans
    )

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000, url_scheme='https')
    