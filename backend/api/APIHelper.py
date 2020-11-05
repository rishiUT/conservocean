from flask import jsonify, abort
from database import app


# Some data used for matching input data and index values across the database
habitatDict = {"freshwater": 0, "brackish": 1, "saltwater": 2}
endangerCodes = ["DD", "LC", "NT", "VU", "EN", "CR", "EW", "EX"]


def checkArgs(args, string1, string2):
    """
    Checks given arguments to guarantee that both exist in the args parameter.

        Parameters:
            - args: (dict) Arguments to check values in.
            - string1: (str) key 1 to check in dictionary.
            - string2: (str) key 2 to check in dictionary.

        Returns:
            True if args[string1] or args[string2] is None,
            False if both are None or both are populated. (XOR)
    """

    # Check that both entries in args are not None
    if (args[string1] != None and args[string2] is None) or (
        args[string1] is None and args[string2] != None
    ):
        return True
    return False


@app.errorhandler(404)
def resource_not_found(e):
    """
    Error handler for 404 error code, resource not found.

        Parameters:
            e: (str) String to print as error message.

        Returns:
            Json form of error message with error code 404.
    """

    return jsonify(error=str(e)), 404


@app.errorhandler(422)
def bad_input(e):
    """
    Error handler for 422 error code, bad input.

        Parameters:
            e: (str) String to print as error message.

        Returns:
            Json form of error message with error code 422.
    """

    return jsonify(error=str(e)), 422


def validateArgs(keys: dict, args: dict):
    """
    Validates that all keys in args match keys in "keys"

        Parameters:
            keys: (dict) Dictionary of given allowed keys.
            args: (dict) Dictionary of keys to check.

        Returns:
            404 error code with "Bad input" error message if args does not
            match keys. No return value if it does match.
    """

    keys["offset"] = 0
    keys["limit"] = 0
    keys["sort"] = 0
    keys["ascending"] = 0
    for entry in args:
        if entry not in keys:
            abort(404, description="Bad input")


def makeWater(water, link):
    """
    Transform a Water object into a dictionary.
    RECOMMENDED: Only call with link=1 for very few total water objects.
    Otherwise the running time will drastically slow down.

        Parameters:
            water: (BodiesOfWater) Water object to transform into dict
            link: (int) If 1, show links in the dict. Do not if 0.

        Returns:
            A dict version of the Water object.
    """

    # Return empty dictionary if no object is passed
    if water is None:
        return {}

    # Create the dictionary of the water object
    water_dict = water.serialized

    # Add links to the dictionary
    if link:
        water_dict["fish"] = water.get_fish()
        water_dict["human_impact_ids"] = water.get_human()

    return water_dict


def makeHuman(human, link):
    """
    Transform a Human Impact object into a dictionary.
    RECOMMENDED: Only call with link=1 for very few total human objects.
    Otherwise the running time will drastically slow down.

        Parameters:
            human: (HumanImpact) Human object to transform into dict
            link: (int) If 1, show links in the dict. Do not if 0.

        Returns:
            A dict version of the Human object.
    """

    # Return empty dictionary if no object is passed
    if human is None:
        return {}

    # Create the dictionary of the human object
    human_dict = human.serialized

    # Add links to the dictionary
    if link:
        human_dict["location"] = human.get_water()
        human_dict["fish"] = human.get_fish()
    return human_dict


def makeFish(fish, link):
    """
    Transform a Fish object into a dictionary.
    RECOMMENDED: Only call with link=1 for very few total fish objects.
    Otherwise the running time will drastically slow down.

        Parameters:
            water: (Fish) Fish object to transform into dict
            link: (int) If 1, show links in the dict. Do not if 0.

        Returns:
            A dict version of the Fish object.
    """

    # Return empty dictionary if no object is passed
    if fish is None:
        return {}

    # Create the dictionary of the fish object
    fish_dict = fish.serialized

    # Add links the the dictionary
    if link:
        fish_dict["location"] = fish.get_water()
        fish_dict["human_impact_ids"] = fish.get_human()
    return fish_dict