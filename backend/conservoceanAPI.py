import os
import json
import requests
from flask import request, render_template, jsonify, abort
from flask_restful import Api, Resource, reqparse
from database import db, Fish, BodiesOfWater, HumanImpact, app
from APIHelper import *
from APIFilter import *
from APISort import *

import cProfile
import re

api = Api(app)

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def index(path):
#     return render_template("index.html")


class FishList(Resource):
    """
    Resource class used when parsing URL query parameters with
    API endpoint "/api/fish?..."
    """

    # Query parameter registration
    fish_parser = reqparse.RequestParser()
    fish_parser.add_argument('species', type=str)
    fish_parser.add_argument('scientific_name', type=str)
    fish_parser.add_argument('common_name', type=str)
    fish_parser.add_argument('location', type=str)
    fish_parser.add_argument('status', type=str)
    fish_parser.add_argument('population_trend', type=str)
    fish_parser.add_argument('limit', type=int)
    fish_parser.add_argument('offset', type=int)
    fish_parser.add_argument('genus', type=str)
    fish_parser.add_argument('habitat', type=str)
    fish_parser.add_argument('family', type=str)
    fish_parser.add_argument('sort', type=str)
    fish_parser.add_argument('ascending', type=str)
    fish_parser.add_argument('size_min', type=int)
    fish_parser.add_argument('size_max', type=int)


    def get(self):
        """
        Function evoked when query parameters are passed through the URL.
        """

        args = self.fish_parser.parse_args()

        # Default "ascending" to True if not specified
        if args['ascending'] == None:
            args['ascending'] = "True"

        # Validate the passed parameters to make sure they are handleable
        validateArgs({'species':0, 'scientific_name':0, 'common_name':0,
                    'status':0, 'population_trend':0, 'location':0,
                    'genus':0, 'habitat':0, 'family':0,
                    'size_min':0, 'size_max':0}, args)

        # Check for if we need to sort or filter
        if args['sort'] != None:

            # Sort the fish list, and then filter it. filterFish
            # generates a dictionary of the fish objects
            sortedList = sortFish(args['sort'].lower(), \
                   1 if args['ascending'].lower() == "true" else 0)
            if isinstance(sortedList, list):
                return filterFish(args, sortFish(args['sort'].lower(), \
                   1 if args['ascending'].lower() == "true" else 0))
            else:
                return filterFish(args, sortFish(args['sort'].lower(), \
                   1 if args['ascending'].lower() == "true" else 0).all())
        else:
            return filterFish(args, Fish.query.all())

class FishID(Resource):
    """
    Resource class used when parsing URL query parameters with
    API endpoint "/api/fish/{id}"
    """

    def get(self, id):
        """
        Function evoked when query parameters are passed through the URL.

            Parameters:
                id: (int) Primary key value for the requested HumanImpact
                          object in the database.
        """

        fish = Fish.query.get(id)
        if fish is None:
            return []
        return {"data": makeFish(fish, True)}


class WaterList(Resource):
    """
    Resource class used when parsing URL query parameters with
    API endpoint "/api/water?..."
    """

    # Query parameter registration
    water_parser = reqparse.RequestParser()
    water_parser.add_argument('type', type=str)
    water_parser.add_argument('name', type=str)
    water_parser.add_argument('limit', type=int)
    water_parser.add_argument('offset', type=int)
    water_parser.add_argument('lat_min', type=float)
    water_parser.add_argument('lat_max', type=float)
    water_parser.add_argument('long_min', type=float)
    water_parser.add_argument('long_max', type=float)
    water_parser.add_argument('temp_min', type=float)
    water_parser.add_argument('temp_max', type=float)
    water_parser.add_argument('size_min', type=int)
    water_parser.add_argument('size_max', type=int)
    water_parser.add_argument('sort', type=str)
    water_parser.add_argument('ascending', type=str)

    def get(self):
        """
        Function evoked when query parameters are passed through the URL.
        """

        args = self.water_parser.parse_args()

        # Default "ascending" to True if not specified
        if args['ascending'] == None:
            args['ascending'] = "True"

        # Validate the passed parameters to make sure they are handleable
        validateArgs({'type':0, 'name':0, 'lat_min':0, 'lat_max':0,
                      'long_min':0, 'long_max':0, 'temp_min':0,
                      'temp_max':0, 'size_min':0, 'size_max':0}, args)

        # Check for if we need to sort or filter
        if args['sort'] != None:

            # Sort the water list, and then filter it. filterWater
            # generates a dictionary of the water objects
            return filterWater(args, sortWater(args['sort'].lower(), \
                   1 if args['ascending'].lower() == "true" else 0).all())
        else:
            return filterWater(args, BodiesOfWater.query.all())

class WaterID(Resource):
    """
    Resource class used when parsing URL query parameters with
    API endpoint "/api/water/{id}"
    """

    def get(self, id):
        """
        Function evoked when query parameters are passed through the URL.

            Parameters:
                id: (int) Primary key value for the requested BodiesOfWater
                          object in the database.
        """

        water = BodiesOfWater.query.get(id)
        if water is None:
            return []
        return {"data": makeWater(water, True)}


class HumanList(Resource):
    """
    Resource class used when parsing URL query parameters with
    API endpoint "/api/human?..."
    """

    # Query parameter registration
    human_parser = reqparse.RequestParser()
    human_parser.add_argument('subcategory', type=str)
    human_parser.add_argument('lat_max', type=float)
    human_parser.add_argument('long_max', type=float)
    human_parser.add_argument('lat_min', type=float)
    human_parser.add_argument('long_min', type=float)
    human_parser.add_argument('sort', type=str)
    human_parser.add_argument('ascending', type=str)
    human_parser.add_argument('limit', type=int)
    human_parser.add_argument('offset', type=int)
    human_parser.add_argument('oil_amount_min', type=int)
    human_parser.add_argument('oil_amount_max', type=int)
    human_parser.add_argument('CD_1_min', type=float)
    human_parser.add_argument('CD_1_max', type=float)

    def get(self):
        """
        Function evoked when query parameters are passed through the URL.
        """

        args = self.human_parser.parse_args()

        # Default "ascending" to True if not specified
        if args['ascending'] == None:
            args['ascending'] = "True"

        # Validate the passed parameters to make sure they are handleable
        validateArgs({'subcategory':0, 'lat_max':0, 'lat_min':0, 'long_max':0,
                      'long_min':0, 'oil_amount_min':0, 'CD_1_min':0,
                      'oil_amount_max':0, 'CD_1_max':0}, args)

        # Check for if we need to sort or filter
        if args['sort'] != None:

            # Sort the human impact list, and then filter it. filterHuman
            # generates a dictionary of the human impact objects
            return filterHuman(args, sortHuman(args['sort'].lower(), \
                   1 if args['ascending'].lower() == "true" else 0).all())
        else:
            return filterHuman(args, HumanImpact.query.all())

class HumanID(Resource):
    """
    Resource class used when parsing URL query parameters with
    API endpoint "/api/human/{id}"
    """

    def get(self, id):
        """
        Function evoked when query parameters are passed through the URL.

            Parameters:
                id: (int) Primary key value for the requested HumanImpact
                        object in the database.
        """

        human = HumanImpact.query.get(id)
        if human is None:
            return []
        return {"data": makeHuman(human, True)}


# Endpoints for the API
api.add_resource(FishList, '/api/fish')
api.add_resource(FishID, '/api/fish/<int:id>/')

api.add_resource(WaterList, '/api/water')
api.add_resource(WaterID, '/api/water/<int:id>/')

api.add_resource(HumanList, '/api/human')
api.add_resource(HumanID, '/api/human/<int:id>/')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, threaded=True, debug=True)

    #cProfile.run('app.run(host=\'0.0.0.0\', debug=True)', None, sort='cumtime')
    #app.run(host='0.0.0.0', debug=True)
