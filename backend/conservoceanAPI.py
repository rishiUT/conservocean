import os
import json
import requests
from flask import request, render_template
from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask import Flask, jsonify, abort
from database import db, Fish, BodiesOfWater, HumanImpact, app

api = Api(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")

# https: // conservocean.me/api/fish/location


@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404


def validateArgs(keys: dict, args: dict):
    keys["offset"] = 0
    keys["limit"] = 0
    for entry in args:
        if entry not in keys:
            abort(404, description="Bad input")


def filterFish(args):
    limit = args['limit']
    offset = args['offset'] if not None else 0

    return_list = []
    fish_list = Fish.query.all()
    for fish in fish_list:
        add = True
        if args['species'] != None:
            if fish.species != args['species']:
                add = False

        if args['common_name'] != None:
            if fish.common_name != args['common_name']:
                add = False

        if args['status'] != None:
            if fish.endanger_status != args['status']:
                add = False

        if args['population_trend'] != None:
            if fish.population_trend != args['population_trend']:
                add = False

        if args['scientific_name'] != None:
            if fish.scientific_name != args['scientific_name']:
                add = False

        if add:
            if offset != 0 and offset is not None:
                offset -= 1
            elif limit is not None:
                if limit > 0:
                    return_list.append(makeFish(fish))
                    limit -= 1
                if limit == 0:
                    break
            else:
                return_list.append(makeFish(fish))

    return {"total_fish_count": len(fish_list), "total_fish_returned": len(return_list), "data": return_list}


class FishList(Resource):
    fish_parser = reqparse.RequestParser()
    fish_parser.add_argument('species', type=str)
    fish_parser.add_argument('scientific_name', type=str)
    fish_parser.add_argument('common_name', type=str)
    fish_parser.add_argument('location', type=str)
    fish_parser.add_argument('status', type=str)
    fish_parser.add_argument('population_trend', type=str)
    fish_parser.add_argument('limit', type=int)
    fish_parser.add_argument('offset', type=int)

    def get(self):
        args = self.fish_parser.parse_args()
        validateArgs({'species': 0, 'scientific_name': 0, 'common_name': 0, 'status': 0, 'population_trend': 0, 'location': 0}, args)
        return filterFish(args)


class FishID(Resource):
    def get(self, id):
        fish = Fish.query.get(id)
        if fish is None:
            return []
        returnlist = []
        returnlist.append(makeFish(fish))
        return {"total_fish_returned": 1, "data": returnlist}


def filterHuman(args):
    limit = args['limit']
    offset = args['offset'] if not None else 0

    return_list = []
    human_list = HumanImpact.query.all()
    for impact in human_list:
        add = True
        if args['category'] != None:
            if impact.category != args['category']:
                add = False

        if args['subcategory'] != None:
            if impact.subcategory != args['subcategory']:
                add = False

        if args['latitude'] != None:
            if (abs(impact.latitude - args['latitude']) > 0.5) and (abs(impact.longitude - args['longitude']) > 0.5):
                add = False

        if add == True:
            if offset != 0 and offset is not None:
                offset -= 1
            elif limit is not None:
                if limit > 0:
                    return_list.append(makeHuman(impact))
                    limit -= 1
                if limit == 0:
                    break
            else:
                return_list.append(makeHuman(impact))

    return {"total_impact_count": len(human_list), "total_impact_returned": len(return_list), "data": return_list}


class HumanList(Resource):
    human_parser = reqparse.RequestParser()
    human_parser.add_argument('category', type=str)
    human_parser.add_argument('subcategory', type=str)
    human_parser.add_argument('latitude', type=int)
    human_parser.add_argument('longitude', type=int)
    human_parser.add_argument('limit', type=int)
    human_parser.add_argument('offset', type=int)

    def get(self):
        args = self.human_parser.parse_args()
        validateArgs({'category': 0, 'subcategory': 0, 'latitude': 0, 'longitude': 0}, args)
        if ('latitude' in args and 'longitude' not in args) or ('latitude' not in args and 'longitude' in args):
            return []
        return filterHuman(args)


class HumanID(Resource):
    def get(self, id):
        human = HumanImpact.query.get(id)
        if human is None:
            return []
        returnlist = []
        returnlist.append(makeHuman(human))
        return {"total_impact_returned": 1, "data": returnlist}


def filterWater(args):
    latlongrad = 0.5  # Current default radius for longitude/latitude
    limit = args['limit']
    offset = args['offset'] if not None else 0
    water_list = []

    if (args['latitude'] is not None and args['longitude'] is None) or (args['longitude'] is not None and args['latitude'] is None):
        return []

    return_list = []
    water_list = BodiesOfWater.query.all()
    for water in water_list:
        add = True
        if args['latitude'] != None:
            if abs(water.latitude - args['latitude']) > latlongrad and abs(water.longitude - args['longitude']) > latlongrad:
                add = False

        if args['type'] != None:
            if water.type != args['type']:
                add = False

        if args['name'] != None:
            if water.name != args['name']:
                add = False

        if add == True:
            if offset != 0 and offset is not None:
                offset -= 1
            elif limit is not None:
                if limit > 0:
                    return_list.append(makeWater(water))
                    limit -= 1
                if limit == 0:
                    break
            else:
                return_list.append(makeWater(water))

    return {"total_water_count": len(water_list), "total_water_returned": len(return_list), "data": return_list}


class WaterList(Resource):
    water_parser = reqparse.RequestParser()
    water_parser.add_argument('type', type=str)
    water_parser.add_argument('name', type=str)
    water_parser.add_argument('latitude', type=int)
    water_parser.add_argument('longitude', type=int)
    water_parser.add_argument('limit', type=int)
    water_parser.add_argument('offset', type=int)

    def get(self):
        args = self.water_parser.parse_args()
        validateArgs(
            {'type': 0, 'name': 0, 'latitude': 0, 'longitude': 0}, args)
        return filterWater(args)


class WaterID(Resource):
    def get(self, id):
        water = BodiesOfWater.query.get(id)
        if water is None:
            return []
        returnlist = []
        returnlist.append(makeWater(water))
        return {"total_water_returned": 1, "data": returnlist}


def makeWater(water):
    if water is None:
        return {}
    water_dict = water.serialized
    water_dict["fish"] = water.get_fish()
    water_dict["human_impact_ids"] = water.get_human()
    return water_dict


def makeHuman(human):
    if human is None:
        return {}
    human_dict = human.serialized
    human_dict["location"] = human.get_water()
    human_dict["fish"] = human.get_fish()
    return human_dict


def makeFish(fish):
    if fish is None:
        return {}
    fish_dict = fish.serialized
    fish_dict["location"] = fish.get_water()
    fish_dict["human_impact_ids"] = fish.get_human()
    return fish_dict


api.add_resource(FishList, '/api/fish')
api.add_resource(FishID, '/api/fish/<int:id>/')

api.add_resource(HumanList, '/api/human')
api.add_resource(HumanID, '/api/human/<int:id>/')

api.add_resource(WaterList, '/api/water')
api.add_resource(WaterID, '/api/water/<int:id>/')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, threaded=True, debug=True)
