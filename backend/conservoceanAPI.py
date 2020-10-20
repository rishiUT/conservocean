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

def validateArgs(keys:dict, args:dict):
    keys["offset"] = 0
    keys["limit"] = 0
    for entry in args:
        print(entry)
        if entry not in keys:
            abort(404, description="Invalid query parameter")

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
        validateArgs({'species':0,'scientific_name':0,'common_name':0,'status':0,'population_trend':0, 'location':0}, args)
        species = args['species']
        sci_name = args['scientific_name']
        common_name = args['common_name']
        status = args['status']
        population_trend = args['population_trend']
        limit = args['limit']
        offset = args['offset'] if not None else 0
        
        fish_list = Fish.query.all()
        return_list = []
        for fish in fish_list:
            add = True
            if species != None:
                if fish.species != species:
                    add = False

            if common_name != None:
                    if fish.common_name != common_name:
                        add = False
                        
            if status != None:
                    if fish.status != status:
                        add = False
                        
            if population_trend != None:
                if fish.population_trend != population_trend:
                    add = False

            if sci_name != None:
                if fish.scientific_name != sci_name:
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
        
        return {"data": return_list}

class FishID(Resource):
    def get(self, id):
        fish = Fish.query.get(id)
        if fish is None:
            return []
        return {"data": makeFish(fish)}


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
        validateArgs({'category':0,'subcategory':0,'latitude':0,'longitude':0},args)
        if ('latitude' in args and 'longitude' not in args) or ('latitude' not in args and 'longitude' in args):
            return []

        category = args['category']
        subcategory = args['subcategory']
        latitude = args['latitude']
        longitude = args['longitude']
        limit = args['limit']
        offset = args['offset'] if not None else 0
        
        human_list = []
        for impact in HumanImpact.query.all():
            add = True
            if category != None:
                if impact.category != category:
                    add = False

            if subcategory != None:
                if impact.subcategory != subcategory:
                    add = False


            if latitude != None:
                if (abs(impact.latitude - latitude) > 0.5) and (abs(impact.longitude - longitude) > 0.5):
                    add = False
                    
            if add == True:
                if offset != 0 and offset is not None:
                    offset -= 1
                elif limit is not None:
                    if limit > 0: 
                        human_list.append(makeHuman(impact))
                        limit -= 1
                    if limit == 0:
                        break
                else: 
                    human_list.append(makeHuman(impact))
                
        return {"data": human_list}

class HumanID(Resource):
    def get(self, id):
        human = HumanImpact.query.get(id)
        if human is None:
            return []
        return {"data": makeHuman(human)}



class WaterList(Resource):
    # https://conservocean.me/api/water
    # https://conservocean.me/api/water/:id
    # https://conservocean.me/api/water?type=type_string&name=name
    # https://conservocean.me/api/water?name=name_string
    # https://conservocean.me/api/water?latitude=latitude_val&longitude=longitude_val
    water_parser = reqparse.RequestParser()
    water_parser.add_argument('type', type=str)
    water_parser.add_argument('name', type=str)
    water_parser.add_argument('latitude', type=int)
    water_parser.add_argument('longitude', type=int)
    water_parser.add_argument('limit', type=int)
    water_parser.add_argument('offset', type=int)

    def get(self):
        args = self.water_parser.parse_args()
        validateArgs({'type':0,'name':0,'latitude':0,'longitude':0},args)

        latlongrad = 0.5 # Current default radius for longitude/latitude
        latitude = args['latitude']
        longitude = args['longitude']
        _type = args['type']
        name = args['name']
        limit = args['limit']
        offset = args['offset'] if not None else 0
        water_list = []

        if (latitude is not None and longitude is None) or (longitude is not None and latitude is None):
            return []

        for water in BodiesOfWater.query.all():
            add = True
            if latitude != None:
                if abs(water.latitude - latitude) > latlongrad and abs(water.longitude - longitude) > latlongrad:
                    add = False

            if _type != None:
                if water.type != _type:
                    add = False

            if name != None:
                if water.name != name:
                    add = False

            if add == True:
                if offset != 0 and offset is not None:
                    offset -= 1
                elif limit is not None:
                    if limit > 0:
                        water_list.append(makeWater(water))
                        limit -= 1
                    if limit == 0:
                        break
                else:
                    water_list.append(makeWater(water))
                

        return {"data": water_list}

class WaterID(Resource):
    def get(self, id):
        water = BodiesOfWater.query.get(id)
        if water is None:
            return []

        return {"data": makeWater(water)}

def makeWater(water):
    water_dict = water.serialized
    water_dict["fish"] = water.get_fish()
    water_dict["human_impact_ids"] = water.get_human()
    return water_dict
    
def makeHuman(human):
    human_dict = human.serialized
    human_dict["location"] = human.get_water()
    human_dict["fish"] = human.get_fish()
    return human_dict

def makeFish(fish):
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
