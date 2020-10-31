from conservoceanAPI import *
from unittest import main, TestCase
from database import Fish, BodiesOfWater, HumanImpact


class TestAPI(TestCase):

    # Test fish entry 1 for correctness
    def testMakeFish1(self):
        fish = Fish.query.filter_by(id=1)
        fish_dict = makefish(fish)
        
        if fish_dict is {}:
            raise AssertionError

        assert fish_dict['scientific_name'] == "Ablennes hians"
        assert fish_dict['common_name'] == "Flat needlefish"
        assert fish_dict['species'] == "hians"
        assert fish_dict['genus'] == "Ablennes"
        assert fish_dict['family'] == "No Family"
        assert fish_dict['habitat'] == "0 -1 -1"
        assert fish_dict['endanger_status'] == "LC"
        assert fish_dict['population_trend'] == "Unknown"
        assert fish_dict['preferred_temp'] == None
        assert fish_dict['average_size'] == 140
        assert fish_dict['picture_url'] == "https://www.fishbase.de/images/species/Abhia_m0.jpg"
        assert fish_dict['description'] == "Inhabits neritic and oceanic waters but more often found near islands (Ref. 5213).  Found in estuaries (Ref. 26340), and coastal rivers (Ref. 33587).  Sometimes forming large schools (Ref. 5217).  Feeds mainly on small fishes (Ref. 9279).  Oviparous (Ref. 205).  Eggs may be found attached to objects in the water by filaments on the egg's surface (Ref. 205). Since the jaws are frequently broken, the maximum length is given as body length excluding head and caudal fin.  Usually caught with the help of artificial lights (Ref. 9279).  Marketed  fresh and salted; smoked or frozen (Ref. 9987).  Market limited due to the green-colored flesh (Ref. 5217).  In females, only left gonad is developed, and in males the right gonad is small or absent (Ref. 26938)."
        assert fish_dict['speccode'] == 972
        assert fish_dict['catch_year'] == 2018
        assert fish_dict['catch_rate'] == 22

        assert fish_dict['location'] == fish.get_water()
        assert fish_dict['human_impact_ids'] == fish.get_human()
    
    # Test another entry in fish
    def testMakeFish2(self):
        fish = Fish.query.filter_by(id=143)
        fish_dict = makefish(fish)
        
        if fish_dict is {}:
            raise AssertionError

        assert fish_dict['scientific_name'] == "Apeltes quadracus"
        assert fish_dict['common_name'] == "Fourspine stickleback"
        assert fish_dict['species'] == "quadracus"
        assert fish_dict['genus'] == "Apeltes"
        assert fish_dict['family'] == "No Family"
        assert fish_dict['habitat'] == "-1 -1 -1"
        assert fish_dict['endanger_status'] == "LC"
        assert fish_dict['population_trend'] == "Stable"
        assert fish_dict['preferred_temp'] == None
        assert fish_dict['average_size'] == 6
        assert fish_dict['picture_url'] == "https://www.fishbase.de/images/species/Apqua_u6.jpg"
        assert fish_dict['description'] == "Adults occur mainly along weedy bays and backwaters, entering brackish water and to a limited extent, fresh water (Ref. 3814). Feed along the bottom, primarily on diatoms, worms and crustaceans by sucking in the prey with a pipetting action (Ref. 27549). Males build, guard and aerate the nest where the eggs are deposited (Ref. 205)."
        assert fish_dict['speccode'] == 3269
        assert fish_dict['catch_year'] == None
        assert fish_dict['catch_rate'] == None

        assert fish_dict['location'] == fish.get_water()
        assert fish_dict['human_impact_ids'] == fish.get_human()        

    # Test proper behavior of None fish passed
    def testMakeFish3(self):
        fish_dict = makefish(None)
        assert fish_dict == {}
    
    
    # Test human impact entry 1
    def testMakeHuman(self):
        human = HumanImpact.query.filter_by(id=1)
        human_dict = makeHuman(human)
        
        if human_dict is {}:
            raise AssertionError
        
        assert human_dict['category'] == 
        assert human_dict['subcategory'] ==
        assert human_dict['latitude'] ==
        assert human_dict['longitude'] ==
        assert human_dict['date'] ==
        assert human_dict['description'] ==
        assert human_dict['name'] ==
        assert human_dict['oil_amount'] == 
        assert human_dict['count_density_1'] ==
        assert human_dict['count_density_2'] ==
        assert human_dict['count_density_3'] ==
        assert human_dict['count_density_4'] ==
        assert human_dict['plant_rating'] ==
        assert human_dict['plant_location'] ==
        assert human_dict['plant_water_source'] ==

        assert human_dict['location'] == human.getWater()
        assert human_dict['fish'] == human.get_fish()
        
    
    # Test water entry 1 for correctness
    def testMakeWater1(self):
        water = BodiesOfWater.query.filter_by(id=1)
        water_dict = makeWater(water)
        
        if water_dict is {}:
            raise AssertionError

        assert water_dict['name'] == "Biscayne Bay"
        assert water_dict['type'] == "Bay"
        assert water_dict['latitude'] == 26
        assert water_dict['longitude'] == -80
        assert water_dict['min_latitude'] == 25
        assert water_dict['min_longitude'] == -80
        assert water_dict['max_latitude'] == 26
        assert water_dict['max_longitude'] == -80
        assert water_dict['water_temp'] == None
        assert water_dict['tide_height'] == None
        assert water_dict['size'] == 2863

        assert water_dict['fish'] == water.get_fish()
        assert water_dict['human_impact_ids'] == water.get_human()

    # Test another entry in water
    def testMakeWater2(self):
        water = BodiesOfWater.query.filter_by(id=192)
        water_dict = makeWater(water)
        
        if water_dict is {}:
            raise AssertionError

        assert water_dict['name'] == "Mare Shoal"
        assert water_dict['type'] == "Shoal"
        assert water_dict['latitude'] == 44
        assert water_dict['longitude'] == -64
        assert water_dict['min_latitude'] == 44
        assert water_dict['min_longitude'] == -64
        assert water_dict['max_latitude'] == 44
        assert water_dict['max_longitude'] == -64
        assert water_dict['water_temp'] == None
        assert water_dict['tide_height'] == None
        assert water_dict['size'] == 14

        assert water_dict['fish'] == water.get_fish()
        assert water_dict['human_impact_ids'] == water.get_human()
        
    # Test proper behavior of None water passed
    def testMakeWater3(self):
        water_dict = makewater(None)
        assert water_dict == {}
    
    def testValidateArgs1(self):
        dict1 = {"name":"Andy", "name2":"Dane", "name3":"Christine"}  
        dict2 = {"name1": "Andy", "name2": "Dane", "name3": "Christine"}
        message, status_code = validateArgs(dict1, dict2)
        assert message == "Invalid query parameter"
        assert status_code == 404

    # Test limit and offset for fish
    def testFilterFish1(self):
        args = {'limit':10}
        fish_dict = filterFish(args)
        assert len(fish_dict.keys) == 3
        assert fish_dict['total_fish_returned'] == 10
        assert len(fish_dict['data']) == 10

        args = {'limit':1, 'offset':5}
        fish_dict = filterFish(args)
        assert len(fish_dict.keys) == 3
        assert len(fish_dict['data']) == 1
        assert fish_dict['data'][0]['scientific_name'] == "Abudefduf sexfasciatus"

    # Test filtering fish by species
    def testFilterFish2(self):
        args = {'species':"hians", 'limit':10}
        fish_dict = filterFish(args)
        for fish in fish_dict['data']:
            assert "hians" in fish['scientific_name']
            assert fish['species'] == "hians"

    # Test filtering fish by common name
    def testFilterFish3(self):
        args = {'common_name':"Night sergeant"}
        fish_dict = filterFish(args)
        assert len(fish_dict['data']) == 1
        assert fish_dict['data'][0]['scientific_name'] == "Abudefduf taurus"

    # Test filtering fish by IUCN status
    def testFilterFish4(self):
        args = {'status':"VU", 'limit':10}
        fish_dict = filterFish(args)
        for fish in fish_dict['data']:
            assert fish['status'] == "VU"

    # Test filtering fish by population trend
    def testFilterFish5(self):
        args = {'population_trend':"Stable", 'limit':10}
        fish_dict = filterFish(args)
        for fish in fish_dict['data']:
            assert fish['population_trend'] == "Stable"

    # Test filtering fish by scientific name
    def testFilterFish6(self):
        args = {'scientific_name':"Acanthurus guttatus"}
        fish_dict = filterFish(args)
        assert len(fish_dict['data']) == 1
        assert fish_dict['data'][0]['scientific_name'] == "Acanthurus guttatus"
        
        args = {'scientific_name':"845y674ytw734ykjgvhn34"}
        fish_dict = filterFish(args)
        assert len(fish_dict['data']) == 0


    # test filtering bodies of water by name
    def testFilterWater1(self):
        args = {'name': 'Paiko Lagoon'}
        water_dict = filterWater(args)
        assert len(water_dict['data']) == 1
        assert water_dict['data'][0]['latitude'] == 21
        
    # test filtering bodies of water by type
    def testFilterWater2(self):
        args = {'type': 'Bay', 'limit': 10}
        water_dict = filterWater(args)
        for water in water_dict['data']:
            assert water['type'] == 'Bay'
    
if __name__ == "__main__":
    main()
