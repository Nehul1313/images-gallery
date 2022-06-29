# save this as app.py
from flask import Flask, request
import os
import requests
#from dotenv import load_dotenv

# load_dotenv(dotenv_path='./.env.local')
UNSPLASH_URL = 'https://api.unsplash.com/photos/random'
#UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY","")
UNSPLASH_KEY = 'dRfgDAQ9bnf3q-h7lQ_SKFzgk7P2uVQjsu2_JzVb-Nk'


if not UNSPLASH_KEY:
    raise EnvironmentError("UNSPLASH_KEY not set")





app = Flask(__name__)


@app.route("/new-image")
def new_image():
    word = request.args.get("query")

    headers = {
        'Accept-Version': 'v1',
        'Authorization': 'Client-ID ' + UNSPLASH_KEY,

    }

    params = {
        'query': word
    }
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()

    return data


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
    # app.run(host='
