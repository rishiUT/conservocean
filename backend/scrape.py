from database import db
from models.ModelFish import Fish
from models.ModelWater import BodiesOfWater
from models.ModelHuman import HumanImpact
import requests
from math import radians, cos, sin, asin, sqrt
import time
import sys
from sqlalchemy import exc
import json

water_dict = {}

# O(fishbase^2 + bison^4 + marineregions^8)?
def scrapeFish(limit, offset):
    """
    Scrapes fishbase api for fish instances. Then uses common name to get
    endangered status and population trend from iucn redlist api. Uses
    bison api to get the location of the fish.

        Parameters:
            limit: (int) Used internally to know how many fish to scrape
                         through in one run.
            offset: (int) Used internally to know where in the FishBaseAPI to
                          begin scraping.

        Returns:
            Nothing in Python, but outputs a list of names of water in the
            database, for use in subsequent runs. Prints for shell scripting.
    """

    limit_size = limit
    offset_size = offset

    # FishBase API call
    fish_json = requests.get(
        "https://fishbase.ropensci.org/species?limit="
        + str(limit)
        + "&offset="
        + str(offset)
    ).json()

    water_num = 0
    fish_num = 0
    for fish in fish_json["data"]:

        # Only include fish that have a common name and an image
        if fish["FBname"] is not None and fish["image"] is not None:
            # API gives 502 error from time to time
            while True:
                try:
                    # IUCNRedList API call
                    iucn = requests.get(
                        "https://apiv3.iucnredlist.org/api/v3/species/"
                        + fish["Genus"]
                        + " "
                        + fish["Species"]
                        + "?token=f14c921837d6ee4ca1663ad0e6a999ab418023"
                        + "e4f125de6f67f307b7794f47fe"
                    ).json()
                    break
                except ValueError as error:
                    time.sleep(5)

            # Acquire the 
            iucn_code = "N.E."
            population_trend = "No trend given"
            try:
                iucn = iucn["result"]
                if iucn != []:
                    iucn = iucn[0]
                    iucn_code = iucn["category"]
                    if iucn["population_trend"] != None:
                        population_trend = iucn["population_trend"]
            
            # KeyError occurs when no IUCN data exists for a fish
            except KeyError as error:
                pass

            # Only include if fish has an evaluated IUCN code.
            if iucn_code != "N.E.":
                fish_object = Fish(
                    scientific_name=fish["Genus"] + " " + fish["Species"],
                    common_name=fish["FBname"],
                    species=fish["Species"],
                    genus=fish["Genus"],
                    family=fish["Subfamily"],
                    habitat=str(fish["Fresh"])
                        + " " + str(fish["Brack"]) 
                        + " " + str(fish["Saltwater"]),
                    average_size=fish["Length"],
                    description=fish["Comments"],
                    picture_url=fish["image"],
                    speccode=fish["SpecCode"],
                    endanger_status=iucn_code,
                    population_trend=population_trend,
                )

                # Terrible API that likes to go down when accessing sometimes
                while True:
                    try:
                        fish_location = requests.get(
                            "https://bison.usgs.gov/api/search.json?species="
                            + fish["Genus"]
                            + " " + fish["Species"] + "&type=scientific_name"
                        )
                        break
                    except requests.ConnectionError as error:
                        time.sleep(10)

                fish_location_json = fish_location.json()
                add = False
                scrape = True
                for locations in fish_location_json["data"]:
                    try:
                        latitude = locations["decimalLatitude"]
                        longitude = locations["decimalLongitude"]
                        waterlist = scrapeWater(latitude, longitude)
                        if waterlist != []:
                            add = True
                            for water in waterlist:
                                water_num += 1
                                fish_object.location.append(
                                    BodiesOfWater.query.get(water)
                                )
                    
                    # KeyError occurs when there is no location for a fish
                    except KeyError as error:
                        pass
                if add:
                    scrapeOverfishing(fish_object)
                    db.session.add(fish_object)
                    db.session.commit()

    returnString = json.dumps(water_dict)
    print(returnString)


def scrapeOverfishing(fish_object):
    """
    Scrapes overfishing data for a single fish using the openfisheries API.

        Parameters:
            fish_object: (Fish) The object with which to look up
                                overfishing data.
    """

    # OpenFisheries API call, returns a full list of species
    url = "http://www.openfisheries.org/api/landings/species.json"
    overfishing = requests.get(url).json()

    a3_code = ""
    scientific_name = fish_object.scientific_name

    # API returns a list of overfishing data, so we acquire the most recent data
    for instance in overfishing:
        curr_scientific_name = instance["scientific_name"]
        if curr_scientific_name == scientific_name:
            a3_code = instance["a3_code"]
            break

    if a3_code != "":

        # OpenFisheries API call, for specific fishing data on a species
        spec_overfishing = requests.get(
            "http://www.openfisheries.org/api/landings/species/"
            + a3_code + ".json"
        )

        # Test that information exists
        if spec_overfishing.status_code != 404:
            spec_overfishing = spec_overfishing.json()
            catch_year = 0
            catch_rate = 0
            for fish_catch in spec_overfishing:
                if fish_catch["catch"] != 0:
                    catch_year = fish_catch["year"]
                    catch_rate = fish_catch["catch"]

            # Make sure that there is valid data
            if catch_year != 0 and catch_rate != 0:
                fish_object.catch_year = str(catch_year)
                fish_object.catch_rate = catch_rate


def scrapeWater(lat, long):
    """
    Scrapes for the instances for bodies of water whose latitude and longitude
    are within 0.4 degrees of the input parameters (lat, long). Lat/long are
    locational data of a specific fish that we are finding water for.

        Parameters:
            lat: (float) Latitude coordinate for location lookup.
            long: (float) Longitude coordinate for location lookup.

        Returns:
            A list of BodiesOfWater objects that need to be linked to the fish.
    """

    # Dict for valid water types in MarineRegions API. Dict used for O(1) lookup
    valid_water = {"FAO Major Marine Fishing Areas":0, "Ocean":0, "Sea":0,
                   "Gulf":0, "Basin":0, "Channel":0, "Water mass":0,
                   "Current":0, "Strait":0,  "Bight":0,"Bay":0, "Lake":0,
                   "River":0, "Stream":0, "Fjord":0, "Lagoon":0, "Estuary":0,
                   "Swale":0, "Canal":0, "Abyssal Plain":0, "Coast":0,
                   "Inlet":0, "Hole":0, "Delta":0, "Seachannel":0,
                   "Escarpment":0, "Fan":0, "Seamount Chain":0, "Reef":0,
                   "Rise":0, "Levee":0, "Moat":0, "Shoal":0, "Sill":0, "Dike":0,
                   "Mud Flat":0, "Salt Marsh":0, "Polder":0, "Harbour":0,
                   "Dock":0, "Sluice":0, "Reservoir":0, "Shelf":0,
                   "Large Marine Ecosystem":0, "Beach":0, "Pit":0, "Cove":0,
                   "Sea floor":0, "Creek":0, "Marsh(es)":0, "Swamp":0,
                   "River Outlet":0, "Wetland":0, "Spring":0, "Aquifer":0,
                   "Maar":0, "Pond":0, "Waterfall":0}

    water_json = []

    # Looped try-block here because this API was flaky and would error often
    while True:
        try:
            # MarineRegions API call, by lat/long
            water = requests.get(
                "https://www.marineregions.org/rest/"
                + "getGazetteerRecordsByLatLong.json/"
                + str(lat)
                + "/"
                + str(long)

                # 0.4 used for lat/long range in either direction
                + "/0.4/0.4/"
            )
            water_json = water.json()
            break
        
        # ValueError and ConnectionError both
        # occured with this API call randomly
        except ValueError as error:
            time.sleep(8)
        except requests.ConnectionError as error:
            time.sleep(8)

    id_list = []

    for bodyofwater in water_json:
        if bodyofwater["placeType"] in valid_water:
            calcSize = -1

            # Make sure that our water entry has min and max values
            # for latitude and longitude, and that it does not already
            # exist in our database
            if (
                bodyofwater["minLatitude"] != None
                and bodyofwater["maxLatitude"] != None
                and bodyofwater["minLongitude"] != None
                and bodyofwater["maxLongitude"] != None
                and bodyofwater["preferredGazetteerName"] not in water_dict
            ):
                # Calculate the size of the body of water, in km^2
                calcSize = calc_dist(
                    bodyofwater["minLatitude"],
                    bodyofwater["maxLatitude"],
                    bodyofwater["minLongitude"],
                    bodyofwater["maxLongitude"],
                )

                water_entry = BodiesOfWater(
                    name=bodyofwater["preferredGazetteerName"],
                    type=bodyofwater["placeType"],
                    latitude=bodyofwater["latitude"],
                    longitude=bodyofwater["longitude"],
                    min_latitude=bodyofwater["minLatitude"],
                    max_latitude=bodyofwater["maxLatitude"],
                    min_longitude=bodyofwater["minLongitude"],
                    max_longitude=bodyofwater["maxLongitude"],
                    size=calcSize,
                )

                db.session.add(water_entry)
                db.session.commit()
                water_dict[water_entry.name] = water_entry.id
                id_list.append(water_entry.id)

            # If body of water exists in our database already, we still need to
            # ensure it gets linked to our fish properly, but not create a new
            # water entry
            elif bodyofwater["preferredGazetteerName"] in water_dict:
                id_list.append(
                    water_dict[bodyofwater["preferredGazetteerName"]])
    return id_list


def calc_dist(lat1, lat2, long1, long2):
    """
    Helper function to calculate the distance between 2
    coordinates in km^2.

        Parameters:
            lat1: (float) Minimum value for latitude.
            lat2: (float) Maximum value for latitude.
            long1: (float) Minimum value for longitude.
            long2: (float) Maximum value for longitude.

        Returns:
            The total area of the given range, in km^2.
    """

    dlon = long2 - long1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a))
    r = 6371
    return c * r


def scrapeHuman():
    """
    Scrapes for human impact instances. Calls our other functions from here
    in the order we desire. Must be run after ALL Fish and BodiesOfWater
    entries are made and committed.
    """

    water_list = BodiesOfWater.query.all()
    scrapePollution(water_list)
    scrapePowerPlants(water_list)
    db.session.commit()

    # For sh script
    return "Done Human"


def checkWaters(entry, water_list):
    """
    Adds pollution instance to database if there is at least 1 body of
    water affected by it.

        Parameters:
            entry: (HumanImpact) The entry we are attempting to add.
            water_list: (list) List of all BodiesOfWater in our database.
    """

    added = False

    # For each water entry, check if it is located within 7 degrees latitude
    # and longitude of our attempted human impact location
    for water in water_list:
        if (
            abs(entry.longitude - water.longitude) < 7
            and abs(entry.latitude - water.latitude) < 7
        ):
            entry.water_relationship.append(water)
            added = True
    if added:
        db.session.add(entry)


def scrapePollution(water_list):
    """
    Scrapes for pollution instances (plastic pollution).

        Parameters:
            water_list: (list) List of all BodiesOfWater in our database.
    """

    # ArcGis plastic pollution API call
    url = (
        "https://services6.arcgis.com/C0HVLQJI37vYnazu/arcgis/rest/services"
        + "/Estimate_of_Plastic_Pollution_in_the_World_s_Oceans_1_01_4_75/"
        + "FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
    )
    pollution = requests.get(url).json()

    for instance in pollution["features"]:
        instance = instance["attributes"]

        # Make sure that the plastic pollution entry is not zero
        if (
            instance["CD1____KM_"]
            + instance["CD2____KM_"]
            + instance["CD3____KM_"]
            + instance["CD4____KM_"]
            != 0
        ):
            pollution_entry = HumanImpact(
                category="pollution",
                subcategory="plastic_pollution",
                latitude=instance["LATITUDE"],
                longitude=instance["LONGITUDE"],
                date=instance["DATE"],
                count_density_1=instance["CD1____KM_"],
                count_density_2=instance["CD2____KM_"],
                count_density_3=instance["CD3____KM_"],
                count_density_4=instance["CD4____KM_"],
            )
            checkWaters(pollution_entry, water_list)


def scrapePowerPlants(water_list):
    """
    Scrapes for pollution instances (power plants).

        Parameters:
            water_list: (list) List of all BodiesOfWater in our database.
    """

    # OpenDataSoft powerplant API call, specified to coal plants only
    url = (
        "https://data.opendatasoft.com/api/records/1.0/search/?dataset="
        + "world-power-plants-list%40kapsarc&rows=750&facet=plant_country&"
        + "facet=plant_state&facet=plant_status&facet=plant_type_of_ownership"
        + "&facet=plant_operating_company&facet=type&refine.type=COAL&refine."
        + "plant_status=Operating+Fully"
    )
    powerplant = requests.get(url).json()

    for instance in powerplant["records"]:
        instance = instance["fields"]
        try:
            powerplant_entry = HumanImpact(
                category="pollution",
                subcategory="coal_power_plants",
                longitude=instance["plant_longitude"],
                latitude=instance["plant_latitude"],
                name=instance["plant_name"],
                plant_rating=instance["plant_overall_rating0"],
                plant_location=instance["plant_location"],
                plant_water_source=instance["plant_source_of_cooling_water"],
            )
            checkWaters(powerplant_entry, water_list)

        # KeyError occurs if no entry is pulled up, occured infrequently but
        # occasionally
        except KeyError as error:
            pass
