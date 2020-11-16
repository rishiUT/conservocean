from flask import request
from flask_restful import Resource, reqparse
from database import db
from models.ModelFish import Fish
from models.ModelWater import BodiesOfWater
from models.ModelHuman import HumanImpact
from api.APIHelper import *
from api.APIFilter import filterHuman
from api.APISort import sortHuman

class HumanList(Resource):
    """
    Resource class used when parsing URL query parameters with
    API endpoint "/api/human?..."
    """

    # Query parameter registration
    human_parser = reqparse.RequestParser()
    human_parser.add_argument("subcategory", type=str)
    human_parser.add_argument("lat_max", type=float)
    human_parser.add_argument("long_max", type=float)
    human_parser.add_argument("lat_min", type=float)
    human_parser.add_argument("long_min", type=float)
    human_parser.add_argument("sort", type=str)
    human_parser.add_argument("ascending", type=str)
    human_parser.add_argument("limit", type=int)
    human_parser.add_argument("offset", type=int)
    human_parser.add_argument("oil_amount_min", type=int)
    human_parser.add_argument("oil_amount_max", type=int)
    human_parser.add_argument("CD_1_min", type=float)
    human_parser.add_argument("CD_1_max", type=float)

    def get(self):
        """
        Function evoked when query parameters are passed through the URL.
        """

        args = self.human_parser.parse_args()

        # Default "ascending" to True if not specified
        if args["ascending"] == None:
            args["ascending"] = "True"

        # Validate the passed parameters to make sure they are handleable
        validateArgs(
            {
                "subcategory": 0,
                "lat_max": 0,
                "lat_min": 0,
                "long_max": 0,
                "long_min": 0,
                "oil_amount_min": 0,
                "CD_1_min": 0,
                "oil_amount_max": 0,
                "CD_1_max": 0,
            },
            args,
        )

        # Check for if we need to sort or filter
        if args["sort"] != None:

            # Sort the human impact list, and then filter it. filterHuman
            # generates a dictionary of the human impact objects
            return filterHuman(
                args,
                sortHuman(
                    args["sort"].lower(),
                    1 if args["ascending"].lower() == "true" else 0,
                ).all(),
            )
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
