# save this as app.py
import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import requests
from flask_cors import CORS
from mongo_client import mongo_client

# from mongo_client import insert_test_document

gallery = mongo_client.gallery
images_collection = gallery.images

# from dotenv import load_dotenv

# load_dotenv(dotenv_path='./.env.local')
UNSPLASH_URL = "https://api.unsplash.com/photos/random"
# UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY","")
UNSPLASH_KEY = "dRfgDAQ9bnf3q-h7lQ_SKFzgk7P2uVQjsu2_JzVb-Nk"
DEBUG = bool(os.environ.get("DEBUG", True))


if not UNSPLASH_KEY:
    raise EnvironmentError("UNSPLASH_KEY not set")


app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = DEBUG

# insert_test_document()


@app.route("/new-image")
def new_image():
    word = request.args.get("query")

    headers = {
        "Accept-Version": "v1",
        "Authorization": "Client-ID " + UNSPLASH_KEY,
    }

    params = {"query": word}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()

    return data


@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        # read images from the database
        images = images_collection.find({})
        return jsonify([img for img in images])
    if request.method == "POST":
        # save image to the database
        # json.loads(request.data)
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id

        # return jsonify(images.collection.insert_one(image))
        return {"inserted_id": inserted_id}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
