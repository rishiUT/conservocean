import requests
import json

recipesJson = {}
citiesJson = {}
plantsJson = {}



def calories():
    # 5143 max
    cMatrix = [0] * 21
    for entry in recipesJson:
        calories = round(entry["calories"])
        cMatrix[calories // 250] += 1
    return cMatrix



def plantsByCityTemp():
    # say 120 max for guaranteed entries
    # they store min/max so we are taking the average temp
    min = 100
    max = 0
    cMatrix = [0] * 20
    for entry in citiesJson:
        temp = round((entry["max_temp"] + entry["min_temp"]) / 2)
        if temp > max:
            max = temp
        if temp < min:
            min = temp
        id = entry["id"]
        plantJson = requests.get("https://homefarmer.me/api/Cities/Plants/"+id).json()
        plantJson = plantJson["plants"]
        cMatrix[temp // 5] += len(plantJson)
    print(min)
    print(max)
    return cMatrix



def recipesPerPlantFamily():
    pMatrix = {}
    for entry in plantsJson:
        family = entry["family"]
        id = entry["id"]
        recipeJson = requests.get("https://homefarmer.me/api/Plants/Recipes/"+id).json()
        recipeJson = recipeJson["recipes"]
        key = len(recipeJson)
        try:
            pMatrix[family] += key
        except KeyError as error:
            pMatrix[family] = key
    return pMatrix



if __name__ == "__main__":

    # Get calorie information
    """
    recipesJson = requests.get("https://homefarmer.me/api/Recipes").json()
    recipesJson = recipesJson["recipes"]
    caloriesMatrix = calories()
    print(caloriesMatrix)
    """


    # Get plants per city temp
    """
    citiesJson = requests.get("https://homefarmer.me/api/Cities").json()
    citiesJson = citiesJson["cities"]
    citiesMatrix = plantsByCityTemp()
    print(citiesMatrix)
    """


    # Get total recipes per plant family
    # """
    plantsJson = requests.get("https://homefarmer.me/api/Plants").json()
    plantsJson = plantsJson["plants"]
    plantsMatrix = recipesPerPlantFamily()
    print(plantsMatrix)
    # """
