import json
from flask import request
from flask_restful import Resource, reqparse
from database import db, app
from models.ModelFish import Fish
from models.ModelWater import BodiesOfWater
from models.ModelHuman import HumanImpact
from api.APIHelper import *
from api.APIFilter import *
from api.APISort import sortWater

class WaterList(Resource):
    """
    Resource class used when parsing URL query parameters with
    API endpoint "/api/water?..."
    """

    # Query parameter registration
    water_parser = reqparse.RequestParser()
    water_parser.add_argument("type", type=str)
    water_parser.add_argument("name", type=str)
    water_parser.add_argument("limit", type=int)
    water_parser.add_argument("offset", type=int)
    water_parser.add_argument("lat_min", type=float)
    water_parser.add_argument("lat_max", type=float)
    water_parser.add_argument("long_min", type=float)
    water_parser.add_argument("long_max", type=float)
    water_parser.add_argument("temp_min", type=float)
    water_parser.add_argument("temp_max", type=float)
    water_parser.add_argument("size_min", type=int)
    water_parser.add_argument("size_max", type=int)
    water_parser.add_argument("sort", type=str)
    water_parser.add_argument("ascending", type=str)

    def get(self):
        """
        Function evoked when query parameters are passed through the URL.
        """

        args = self.water_parser.parse_args()

        # Default "ascending" to True if not specified
        if args["ascending"] == None:
            args["ascending"] = "True"

        # Validate the passed parameters to make sure they are handleable
        validateArgs(
            {
                "type": 0,
                "name": 0,
                "lat_min": 0,
                "lat_max": 0,
                "long_min": 0,
                "long_max": 0,
                "temp_min": 0,
                "temp_max": 0,
                "size_min": 0,
                "size_max": 0,
            },
            args,
        )

        # Check for if we need to sort or filter
        if args["sort"] != None:

            # Sort the water list, and then filter it. filterWater
            # generates a dictionary of the water objects
            return filterWater(
                args,
                sortWater(
                    args["sort"].lower(),
                    1 if args["ascending"].lower() == "true" else 0,
                ).all(),
            )
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
