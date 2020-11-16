from flask import request
from flask_restful import Resource, reqparse
from database import db
from models.ModelFish import Fish
from models.ModelWater import BodiesOfWater
from models.ModelHuman import HumanImpact
from api.APIHelper import *
from api.APIFilter import *
from api.APISort import *

class FishList(Resource):
    """
    Resource class used when parsing URL query parameters with
    API endpoint "/api/fish?..."
    """

    # Query parameter registration
    fish_parser = reqparse.RequestParser()
    fish_parser.add_argument("species", type=str)
    fish_parser.add_argument("scientific_name", type=str)
    fish_parser.add_argument("common_name", type=str)
    fish_parser.add_argument("location", type=str)
    fish_parser.add_argument("status", type=str)
    fish_parser.add_argument("population_trend", type=str)
    fish_parser.add_argument("limit", type=int)
    fish_parser.add_argument("offset", type=int)
    fish_parser.add_argument("genus", type=str)
    fish_parser.add_argument("habitat", type=str)
    fish_parser.add_argument("family", type=str)
    fish_parser.add_argument("sort", type=str)
    fish_parser.add_argument("ascending", type=str)
    fish_parser.add_argument("size_min", type=int)
    fish_parser.add_argument("size_max", type=int)

    def get(self):
        """
        Function evoked when query parameters are passed through the URL.
        """

        args = self.fish_parser.parse_args()

        # Default "ascending" to True if not specified
        if args["ascending"] == None:
            args["ascending"] = "True"

        # Validate the passed parameters to make sure they are handleable
        validateArgs(
            {
                "species": 0,
                "scientific_name": 0,
                "common_name": 0,
                "status": 0,
                "population_trend": 0,
                "location": 0,
                "genus": 0,
                "habitat": 0,
                "family": 0,
                "size_min": 0,
                "size_max": 0,
            },
            args,
        )

        # Check for if we need to sort or filter
        if args["sort"] != None:

            # Sort the fish list, and then filter it. filterFish
            # generates a dictionary of the fish objects
            sortedList = sortFish(
                args["sort"].lower(),
                1 if args["ascending"].lower() == "true" else 0
            )
            if isinstance(sortedList, list):
                return filterFish(
                    args,
                    sortFish(
                        args["sort"].lower(),
                        1 if args["ascending"].lower() == "true" else 0,
                    ),
                )
            else:
                return filterFish(
                    args,
                    sortFish(
                        args["sort"].lower(),
                        1 if args["ascending"].lower() == "true" else 0,
                    ).all(),
                )
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