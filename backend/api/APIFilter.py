from api.APIHelper import (
    makeFish,
    makeWater,
    makeHuman,
    checkArgs,
    endangerCodes,
    habitatDict,
)
from models.ModelFish import Fish
from models.ModelWater import BodiesOfWater
from models.ModelHuman import HumanImpact
from flask import abort


def filterFish(args, fish_list):
    """
    Filters table of Fish based on passed parameters args.

        Parameters:
            args: (dict) Dictionary containing various parameters defined in 
            our API documentation.
            fish_list: (list) List of fish to filter through.

        Returns:
            A dict containing "total_fish_count" as an int representing all fish
            in the database, "total_fish_returned" as an int representing all
            fish returned in this filter query, and a list of fish matching
            parameters, listed under "data"
    """
    # Save limit and offset, adjusting offset if it is None in args
    limit = args["limit"]
    offset = args["offset"] if not None else 0

    # Check for bad input in status and in habitat
    if args["status"] != None and args["status"] not in endangerCodes:
        abort(422, description="Status code not valid")

    if args["habitat"] != None and args["habitat"].lower() not in habitatDict:
        abort(422, description="Habitat not valid")

    if checkArgs(args, "size_min", "size_max"):
        return {"message": "Please specify both ends of the range"}

    return_list = []

    # Check each fish in our database against provided parameters in args
    for fish in fish_list:
        add = True

        """
        for entry in args:
            if eval("fish."+entry) != args[entry]:
                add = False
        Look into completely removing dict entries for sort, ascending.
        Also include something like:

        if entry.contains('_max'):
            pass
        else:
            <main code block>

        Doing this avoids checking min/max entries twice
        """

        if args["species"] != None:
            if fish.species != args["species"]:
                add = False

        if args["common_name"] != None:
            if fish.common_name != args["common_name"]:
                add = False

        if args["status"] != None:
            if fish.endanger_status != args["status"]:
                add = False

        if args["population_trend"] != None:
            if fish.population_trend != args["population_trend"]:
                add = False

        if args["scientific_name"] != None:
            if fish.scientific_name != args["scientific_name"]:
                add = False

        if args["genus"] != None:
            if fish.genus != args["genus"]:
                add = False

        if args["family"] != None:
            if fish.family != args["family"]:
                add = False

        if args["size_min"] != None:
            if fish.average_size is not None:
                if (fish.average_size < args["size_min"]) or (
                    fish.average_size > args["size_max"]
                ):
                    add = False
            else:
                add = False

        if args["habitat"] != None:
            # Have to break down our stored String of habitat, where:
            # "-1 0 0" = Freshwater
            # "0 -1 0" = Brackish
            # "0 0 -1" = Saltwater
            splitHabitat = fish.habitat.split()
            if splitHabitat[habitatDict[args["habitat"]]] != "-1":
                add = False

        # Calculate for limit and offset, and leave early if limit is reached
        if add:
            if offset != 0 and offset is not None:
                offset -= 1
            elif limit is not None:
                if limit > 0:
                    return_list.append(fish)
                    limit -= 1
                if limit == 0:
                    break
            else:
                return_list.append(fish)

    return_list = [makeFish(entry, False) for entry in return_list]

    return {
        "total_fish_count": len(fish_list),
        "total_fish_returned": len(return_list),
        "data": return_list,
    }


def filterHuman(args, human_list):
    """
    Filters table of HumanImpact based on passed parameters args.

        Parameters:
            args: (dict) Dictionary containing various parameters defined in 
            our API documentation.
            human_list: (list) List of human impact to filter through.

        Returns:
            A dict containing "total_impact_count" as an int representing all
            human impact in the database, "total_impact_returned" as an int
            representing all human impact returned in this filter query, and a
            list of human impact matching parameters, listed under "data"
    """

    # Save limit and offset, adjusting offset if it is None in args
    limit = args["limit"]
    offset = args["offset"] if not None else 0

    # Check for matching min and max pairs
    if checkArgs(args, "lat_min", "lat_max") or \
       checkArgs(args, "long_min", "long_max"):
        return {"message": "Please specify both ends of the range"}

    return_list = []

    # Check each impact in our database against provided parameters in args
    for impact in human_list:
        add = True

        if args["subcategory"] != None:
            if impact.subcategory != args["subcategory"]:
                add = False

        if args["lat_min"] != None:
            if (impact.latitude < args["lat_min"]) or (
                impact.latitude > args["lat_max"]
            ):
                add = False

        if args["long_min"] != None:
            if (impact.longitude < args["long_min"]) or (
                impact.longitude > args["long_max"]
            ):
                add = False

        if args["oil_amount_min"] != None:
            if impact.oil_amount is not None:
                if (impact.oil_amount < args["oil_amount_min"]) or (
                    impact.oil_amount > args["oil_amount_max"]
                ):
                    add = False
            else:
                add = False

        if args["CD_1_min"] != None:
            if impact.count_density_1 is not None:
                if (impact.count_density_1 < args["CD_1_min"]) or (
                    impact.count_density_1 > args["CD_1_max"]
                ):
                    add = False
            else:
                add = False

        # Calculate for limit and offset, and leave early if limit is reached
        if add == True:
            if offset != 0 and offset is not None:
                offset -= 1
            elif limit is not None:
                if limit > 0:
                    return_list.append(impact)
                    limit -= 1
                if limit == 0:
                    break
            else:
                return_list.append(impact)

    return_list = [makeHuman(entry, False) for entry in return_list]

    return {
        "total_impact_count": len(human_list),
        "total_impact_returned": len(return_list),
        "data": return_list,
    }


def filterWater(args, water_list):
    """
    Filters table of Water based on passed parameters args.

        Parameters:
            args: (dict) Dictionary containing various parameters defined in
            our API documentation.
            water_list: (list) List of water to filter through.

        Returns:
            A dict containing "total_water_count" as an int representing all
            water in the database, "total_water_returned" as an int representing
            all water returned in this filter query, and a list of water
            matching parameters, listed under "data"
    """

    # Current default radius for longitude/latitude
    latlongrad = 0.5

    # Save limit and offset, adjusting offset if it is None in args
    limit = args["limit"]
    offset = args["offset"] if not None else 0

    # Check for matching min and max pairs
    if (
        checkArgs(args, "lat_max", "lat_min")
        or checkArgs(args, "long_max", "long_min")
        or checkArgs(args, "size_max", "size_min")
        or checkArgs(args, "temp_max", "temp_min")
    ):
        return {"message": "Please specify both ends of the range"}

    return_list = []

    # Check each water in our database against provided parameters in args
    for water in water_list:
        add = True

        if args["lat_min"] != None:
            if water.latitude < args["lat_min"] or \
               water.latitude > args["lat_max"]:
                add = False

        if args["long_min"] != None:
            if water.longitude < args["long_min"] or \
               water.longitude > args["long_max"]:
                add = False

        if args["temp_min"] != None:
            if water.water_temp is None:
                add = False
            elif (
                water.water_temp < args["temp_min"]
                or water.water_temp > args["temp_max"]
            ):
                add = False

        if args["size_min"] != None:
            if water.size < args["size_min"] or water.size > args["size_max"]:
                add = False

        if args["type"] != None:
            if water.type != args["type"]:
                add = False

        if args["name"] != None:
            if water.name != args["name"]:
                add = False

        # Calculate for limit and offset, and leave early if limit is reached
        if add == True:
            if offset != 0 and offset is not None:
                offset -= 1
            elif limit is not None:
                if limit > 0:
                    return_list.append(water)
                    limit -= 1
                if limit == 0:
                    break
            else:
                return_list.append(water)

    return_list = [makeWater(entry, False) for entry in return_list]

    return {
        "total_water_count": len(water_list),
        "total_water_returned": len(return_list),
        "data": return_list,
    }
