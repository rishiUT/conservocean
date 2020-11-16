from conservoceanAPI import *
from unittest import main, TestCase
from models.ModelFish import Fish
from models.ModelWater import BodiesOfWater
from models.ModelHuman import HumanImpact
from api.APIHelper import makeFish, makeHuman, makeWater


fish_list = Fish.query.all()
water_list = BodiesOfWater.query.all()


class TestAPI(TestCase):

    # Test fish entry 1 for correctness
    def testMakeFish1(self):
        fish = Fish.query.filter_by(id=1)[0]
        fish_dict = makeFish(fish, 0)

        if fish_dict is {}:
            raise AssertionError

        assert fish_dict["scientific_name"] == "Ablennes hians"
        assert fish_dict["common_name"] == "Flat needlefish"
        assert fish_dict["species"] == "hians"
        assert fish_dict["genus"] == "Ablennes"
        assert fish_dict["family"] == "No Family"
        assert fish_dict["habitat"] == "0 -1 -1"
        assert fish_dict["endanger_status"] == "LC"
        assert fish_dict["population_trend"] == "Unknown"
        assert fish_dict["average_size"] == 140
        assert (
            fish_dict["picture_url"]
            == "https://www.fishbase.de/images/species/Abhia_m0.jpg"
        )
        assert (
            fish_dict["description"]
            == "Inhabits neritic and oceanic "
            + "waters but more often found near islands (Ref. 5213).  Found "
            + "in estuaries (Ref. 26340), and coastal rivers (Ref. 33587).  "
            + "Sometimes forming large schools (Ref. 5217).  Feeds mainly on "
            + "small fishes (Ref. 9279).  Oviparous (Ref. 205).  Eggs may be "
            + "found attached to objects in the water by filaments on the "
            + "egg's surface (Ref. 205). Since the jaws are frequently "
            + "broken, the maximum length is given as body length excluding "
            + "head and caudal fin.  Usually caught with the help of "
            + "artificial lights (Ref. 9279).  Marketed  fresh and salted; "
            + "smoked or frozen (Ref. 9987).  Market limited due to the "
            + "green-colored flesh (Ref. 5217).  In females, only left gonad "
            + "is developed, and in males the right gonad is small or absent "
            + "(Ref. 26938)."
        )
        assert fish_dict["speccode"] == 972
        assert fish_dict["catch_year"] == "2018"
        assert fish_dict["catch_rate"] == 22

    # Test another entry in fish
    def testMakeFish2(self):
        fish = Fish.query.filter_by(id=143)[0]
        fish_dict = makeFish(fish, 0)

        if fish_dict is {}:
            raise AssertionError

        assert fish_dict["scientific_name"] == "Apeltes quadracus"
        assert fish_dict["common_name"] == "Fourspine stickleback"
        assert fish_dict["species"] == "quadracus"
        assert fish_dict["genus"] == "Apeltes"
        assert fish_dict["family"] == "No Family"
        assert fish_dict["habitat"] == "-1 -1 -1"
        assert fish_dict["endanger_status"] == "LC"
        assert fish_dict["population_trend"] == "Stable"
        assert fish_dict["average_size"] == 6
        assert (
            fish_dict["picture_url"]
            == "https://www.fishbase.de/images/species/Apqua_u6.jpg"
        )
        assert (
            fish_dict["description"]
            == "Adults occur mainly along weedy bays and backwaters, entering "
            + "brackish water and to a limited extent, fresh water (Ref. 3814)."
            + " Feed along the bottom, primarily on diatoms, worms and "
            + "crustaceans by sucking in the prey with a pipetting action "
            + "(Ref. 27549). Males build, guard and aerate the nest where the "
            + "eggs are deposited (Ref. 205)."
        )
        assert fish_dict["speccode"] == 3269
        assert fish_dict["catch_year"] == None
        assert fish_dict["catch_rate"] == None

    # Test proper behavior of None fish passed
    def testMakeFish3(self):
        fish_dict = makeFish(None, 0)
        assert fish_dict == {}

    # """
    # # Test human impact entry 1
    def testMakeHuman(self):
        human = HumanImpact.query.filter_by(id=1)[0]
        human_dict = makeHuman(human, 0)

        if human_dict is {}:
            raise AssertionError

        assert human_dict["category"] == "pollution"
        assert human_dict["subcategory"] == "tanker_oil_spills"
        assert human_dict["latitude"] == 42.8115
        assert human_dict["longitude"] == -61.8288
        assert human_dict["date"] == "10/11/1998"
        assert (
            human_dict["description"]
            == "On November 10th 1988, the "
            + "Liberian tanker ODYSSEY, almost fully loaded with a cargo of "
            + "132, 157 tonnes of North Sea Brent crude oil, broke into two "
            + "and sank in heavy weather in the North Atlantic 700 miles off "
            + "the coast of Nova Scotia while on voyage from Sullom Voe, "
            + "Shetland Islands to Come by Chance, Newfoundland.  Fire started "
            + "on the stern section as it sank and the surrounding oil caught "
            + "fire. Due to the rough weather conditions, the Canadian Coast "
            + "Guard was only able to come within 1.75 miles of the vessel "
            + "whilst on fire. As the incident occurred 700 miles from the "
            + "nearest coastline, there were no concerns about pollution as "
            + "the oil was expected to dissipate naturally."
        )
        assert human_dict["name"] == "Odyssey"
        assert human_dict["oil_amount"] == 132000
        assert human_dict["count_density_1"] == None
        assert human_dict["count_density_2"] == None
        assert human_dict["count_density_3"] == None
        assert human_dict["count_density_4"] == None
        assert human_dict["plant_rating"] == None
        assert human_dict["plant_location"] == None
        assert human_dict["plant_water_source"] == None

    # Test water entry 1 for correctness
    def testMakeWater1(self):
        water = BodiesOfWater.query.filter_by(id=1)[0]
        water_dict = makeWater(water, 0)

        if water_dict is {}:
            raise AssertionError

        assert water_dict["name"] == "Biscayne Bay"
        assert water_dict["type"] == "Bay"
        assert water_dict["latitude"] == 25.55
        assert water_dict["longitude"] == -80.2167
        assert water_dict["min_latitude"] == 25.38
        assert water_dict["min_longitude"] == -80.36
        assert water_dict["max_latitude"] == 25.77
        assert water_dict["max_longitude"] == -80.11
        assert water_dict["water_temp"] == 29
        assert water_dict["wind_speedkmph"] == 21
        assert water_dict["size"] == 2863.49360457247

    # Test another entry in water
    def testMakeWater2(self):
        water = BodiesOfWater.query.filter_by(id=192)[0]
        water_dict = makeWater(water, 0)

        if water_dict is {}:
            raise AssertionError

        assert water_dict["name"] == "Mare Shoal"
        assert water_dict["type"] == "Shoal"
        assert water_dict["latitude"] == 44.416667
        assert water_dict["longitude"] == -63.6
        assert water_dict["min_latitude"] == 44.41604
        assert water_dict["min_longitude"] == -63.60086
        assert water_dict["max_latitude"] == 44.4173
        assert water_dict["max_longitude"] == -63.59894
        assert water_dict["water_temp"] == 19.5
        assert water_dict["wind_speedkmph"] == 18
        assert water_dict["size"] == 13.695589794681874

    # Test proper behavior of None water passed
    def testMakeWater3(self):
        water_dict = makeWater(None, 0)
        assert water_dict == {}

    def testValidateArgs1(self):
        dict1 = {"name": "Andy", "name2": "Dane", "name3": "Christine"}
        dict2 = {"name1": "Andy", "name2": "Dane", "name3": "Christine"}
        try:
            message, status_code = validateArgs(dict1, dict2)
        except Exception as error:
            assert True
        else:
            assert False

    # Test limit and offset for fish
    def testFilterFish1(self):
        args = {
            "limit": 10,
            "offset": None,
            "species": None,
            "common_name": None,
            "status": None,
            "population_trend": None,
            "scientific_name": None,
            "habitat": None,
            "size_min": None,
            "size_max": None,
            "genus": None,
            "family": None,
        }
        fish_dict = filterFish(args, fish_list)
        assert len(fish_dict.keys()) == 3
        assert fish_dict["total_fish_returned"] == 10
        assert len(fish_dict["data"]) == 10

        args = {
            "limit": 1,
            "offset": 5,
            "species": None,
            "common_name": None,
            "status": None,
            "population_trend": None,
            "scientific_name": None,
            "habitat": None,
            "size_min": None,
            "size_max": None,
            "genus": None,
            "family": None,
        }
        fish_dict = filterFish(args, fish_list)
        assert len(fish_dict.keys()) == 3
        assert len(fish_dict["data"]) == 1
        assert fish_dict["data"][0]["scientific_name"] == \
            "Abudefduf sexfasciatus"

    # Test filtering fish by species
    def testFilterFish2(self):
        args = {
            "limit": 10,
            "offset": None,
            "species": "hians",
            "common_name": None,
            "status": None,
            "population_trend": None,
            "scientific_name": None,
            "habitat": None,
            "size_min": None,
            "size_max": None,
            "genus": None,
            "family": None,
        }
        fish_dict = filterFish(args, fish_list)
        for fish in fish_dict["data"]:
            assert "hians" in fish["scientific_name"]
            assert fish["species"] == "hians"

    # Test filtering fish by common name
    def testFilterFish3(self):
        args = {
            "limit": None,
            "offset": None,
            "species": None,
            "common_name": "Night sergeant",
            "status": None,
            "population_trend": None,
            "scientific_name": None,
            "habitat": None,
            "size_min": None,
            "size_max": None,
            "genus": None,
            "family": None,
        }
        fish_dict = filterFish(args, fish_list)
        assert len(fish_dict["data"]) == 1
        assert fish_dict["data"][0]["scientific_name"] == "Abudefduf taurus"

    # Test filtering fish by IUCN status
    def testFilterFish4(self):
        args = {
            "limit": 10,
            "offset": None,
            "species": None,
            "common_name": None,
            "status": "VU",
            "population_trend": None,
            "scientific_name": None,
            "habitat": None,
            "size_min": None,
            "size_max": None,
            "genus": None,
            "family": None,
        }
        fish_dict = filterFish(args, fish_list)
        for fish in fish_dict["data"]:
            assert fish["endanger_status"] == "VU"

    # Test filtering fish by population trend
    def testFilterFish5(self):
        args = {
            "limit": 10,
            "offset": None,
            "species": None,
            "common_name": None,
            "status": None,
            "population_trend": "Stable",
            "scientific_name": None,
            "habitat": None,
            "size_min": None,
            "size_max": None,
            "genus": None,
            "family": None,
        }
        fish_dict = filterFish(args, fish_list)
        for fish in fish_dict["data"]:
            assert fish["population_trend"] == "Stable"

    # Test filtering fish by scientific name
    def testFilterFish6(self):
        args = {
            "limit": None,
            "offset": None,
            "species": None,
            "common_name": None,
            "status": None,
            "population_trend": None,
            "scientific_name": "Acanthurus guttatus",
            "habitat": None,
            "size_min": None,
            "size_max": None,
            "genus": None,
            "family": None,
        }
        fish_dict = filterFish(args, fish_list)
        assert len(fish_dict["data"]) == 1
        assert fish_dict["data"][0]["scientific_name"] == "Acanthurus guttatus"

        args = {
            "limit": None,
            "offset": None,
            "species": None,
            "common_name": None,
            "status": None,
            "population_trend": None,
            "scientific_name": "845y674ytw734ykjgvhn34",
            "habitat": None,
            "size_min": None,
            "size_max": None,
            "genus": None,
            "family": None,
        }
        fish_dict = filterFish(args, fish_list)
        assert len(fish_dict["data"]) == 0

    # test filtering bodies of water by name

    def testFilterWater1(self):
        args = {
            "name": "Paiko Lagoon",
            "type": None,
            "limit": None,
            "offset": None,
            "lat_min": None,
            "lat_max": None,
            "long_min": None,
            "long_max": None,
            "size_min": None,
            "size_max": None,
            "temp_min": None,
            "temp_max": None,
        }
        water_dict = filterWater(args, water_list)
        assert len(water_dict["data"]) == 1
        assert water_dict["data"][0]["latitude"] == 21.28611

    # test filtering bodies of water by type
    def testFilterWater2(self):
        args = {
            "type": "Bay",
            "limit": 10,
            "offset": None,
            "name": None,
            "long_min": None,
            "long_max": None,
            "lat_min": None,
            "lat_max": None,
            "size_min": None,
            "size_max": None,
            "temp_min": None,
            "temp_max": None,
        }
        water_dict = filterWater(args, water_list)
        for water in water_dict["data"]:
            assert water["type"] == "Bay"


if __name__ == "__main__":
    main()