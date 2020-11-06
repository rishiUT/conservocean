import os 
from flask import render_template, send_from_directory
from flask_restful import Api
from database import app
from api.APIHuman import *
from api.APIWater import *
from api.APIFish import *

api = Api(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")

@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.ico')

# Endpoints for the API
api.add_resource(FishList, "/api/fish")
api.add_resource(FishID, "/api/fish/<int:id>/")

api.add_resource(WaterList, "/api/water")
api.add_resource(WaterID, "/api/water/<int:id>/")

api.add_resource(HumanList, "/api/human")
api.add_resource(HumanID, "/api/human/<int:id>/")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, threaded=True, debug=True)