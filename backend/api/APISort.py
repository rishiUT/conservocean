from api.APIHelper import makeFish, makeWater, makeHuman
from models.ModelFish import Fish
from models.ModelWater import BodiesOfWater
from models.ModelHuman import HumanImpact
from flask import abort


def sortFish(sortBy, ascending):
    """
    Sorts table of fish in requested order based on given category

        Parameters:
            sortBy: (str) Value of the table to sort by. Allowed values:
                - common_name
                - genus
                - species
                - status
                - size
            ascending: (int) If 1, ascending. Descending if 0

        Returns:
            A list of fish objects sorted in order based on parameters
    """

    # Check for valid sortBy value
    if sortBy not in ["common_name", "genus", "species",
                      "status", "average_size"]:
        abort(422, description="Sort category invalid")

    # Code block for if we are sorting by status code
    # Ascending: LC, NT, VU, EN, CR, EW, EX, DD
    # Descending: EX, EW, CR, EN, VU, NT, LC, DD
    if sortBy == 'status':
        if ascending:
            codeDict = {"LC":0, "NT":1, "VU":2, "EN":3,
                        "CR":4, "EW":5, "EX":6, "DD":7}
        else:
            codeDict = {"EX":0, "EW":1, "CR":2, "EN":3,
                        "VU":4, "NT":5, "LC":6, "DD":7}

        # Create a ragged matrix where rows are status codes
        buckets = [[], [], [], [], [], [], [], []]
        fishList = Fish.query.all()
        for fish in fishList:
            buckets[codeDict[fish.endanger_status]].append(fish)
        fishList = []
        for lists in buckets:
            for entry in lists:
                fishList.append(entry)
        return fishList

    # UNSAFE, used to easily sort fish by the other categories
    # Using very carefully with checking in multiple places for proper input
    return eval(
        "Fish.query.order_by(Fish."
        + sortBy
        + (")" if ascending else ".desc())")
    )


def sortWater(sortBy, ascending):
    """
    Sorts table of water in requested order based on given category

        Parameters:
            sortBy: (str) Value of the table to sort by. Allowed values:
                - name
                - latitude
                - longitude
                - water_temp
                - size
            ascending: (int) If 1, ascending. Descending if 0

        Returns:
            A list of water objects sorted in order based on parameters
    """

    # Check for valid sortBy value
    if sortBy not in ["name", "latitude", "longitude", "water_temp", "size"]:
        abort(422, description="Sort category invalid")

    # UNSAFE, used to easily sort water by the other categories
    # Using very carefully with checking in multiple places for proper input
    return eval(
        "BodiesOfWater.query.order_by(BodiesOfWater."
        + sortBy
        + (")" if ascending else ".desc())")
    )


def sortHuman(sortBy, ascending):
    """
    Sorts table of human impact in requested order based on given category

        Parameters:
            sortBy: (str) Value of the table to sort by. Allowed values:
                - latitude
                - longitude
                - subcategory
                - name
                - count_density_1
            ascending: (int) If 1, ascending. Descending if 0

        Returns:
            A list of human impact objects sorted in order based on parameters
    """

    # Check for valid sortBy value
    if sortBy not in [
        "longitude",
        "latitude",
        "subcategory",
        "name",
        "count_density_1",
    ]:
        abort(422, description="Sort category invalid")

    # UNSAFE, used to easily sort human impact by the other categories
    # Using very carefully with checking in multiple places for proper input
    return eval(
        "HumanImpact.query.order_by(HumanImpact."
        + sortBy
        + (")" if ascending else ".desc())")
    )