from flask import Flask, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

app = Flask(
    __name__,
    static_folder="../frontend/build/static",
    template_folder="../frontend/build",
)

cors = CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "postgresql://postgres:iloveocean"
    + "@conservoceandb.c5r36pk562sk.us-east-2.rds.amazonaws"
    + ".com:5432/conservocean"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Link table for maintaining relationships between models
link = db.Table(
    "links",
    db.Column("fish_id", db.Integer, db.ForeignKey("fish.id")),
    db.Column("water_id", db.Integer, db.ForeignKey("bodies_of_water.id")),
    db.Column("human_id", db.Integer, db.ForeignKey("human_impact.id")),
)


class Fish(db.Model):
    """
    SQLAlchemy Model of a Fish database entry.
    """

    __tablename__ = "fish"
    id = db.Column(db.Integer, primary_key=True)
    scientific_name = db.Column(
        db.String(100), unique=True, nullable=False, \
            default="No Scientific Name"
    )
    common_name = db.Column(db.String(100), nullable=False, \
        default="No Common Name")
    species = db.Column(
        db.String(100), unique=False, nullable=False, default="No Species"
    )
    genus = db.Column(db.String(100), nullable=False, default="No Genus")
    family = db.Column(db.String(100), nullable=False, default="No Family")

    # String of 3 numbers:
    # -1 0 0: Freshwater fish
    # 0 -1 0: Brachish fish
    # 0 0 -1: Saltwater fish
    # Can be a combination of values to show it lives in many types of water
    habitat = db.Column(db.String(100), nullable=False, default="No Habitat")

    endanger_status = db.Column(
        db.String(100), nullable=False, default="No Endanger Status"
    )

    # String, with value "Stable", "Decreasing", "Increasing", or "Unknown"
    population_trend = db.Column(db.String(100), nullable=False)

    # Average length of the fish, in cm
    average_size = db.Column(db.Integer)

    picture_url = db.Column(db.String(200))
    description = db.Column(db.Text)
    speccode = db.Column(db.Integer)

    # For overfishing
    catch_year = db.Column(db.String(4))
    # Total number of fish caught in above year
    catch_rate = db.Column(db.Integer)

    # Relationships
    location = db.relationship(
        "BodiesOfWater", secondary=link,
                         backref=db.backref("fish", lazy="dynamic")
    )

    @property
    def serialized(self):
        """
        Return object data in serializable format.
        """

        return {
            "id": self.id,
            "scientific_name": self.scientific_name,
            "common_name": self.common_name,
            "species": self.species,
            "genus": self.genus,
            "family": self.family,
            "habitat": self.habitat,
            "endanger_status": self.endanger_status,
            "population_trend": self.population_trend,
            "average_size": self.average_size,
            "picture_url": self.picture_url,
            "description": self.description,
            "speccode": self.speccode,
            "catch_year": self.catch_year,
            "catch_rate": self.catch_rate,
            "model": "fish",
        }

    def get_water(self):
        """
        Gets the bodies of water where the fish is found.

            Returns: A list of dictionaries containing the id and name of
                     each body of water.
        """

        return_list = []
        limit = 0
        for water in self.location:
            return_list.append({"id": water.id, "name": water.name})
            limit += 1
            if limit >= 10:
                return return_list

        return return_list

    def get_human(self):
        """
        Gets the human impacts which are located in the same area as where
        the fish is found.

            Returns: A dictionary containing the impacts, each in the array
                     corresponding to the subcategory of that impact.
        """

        return_dict = {
            "plastic_pollution": [],
            "coal_power_plants": [],
            "offshore_oil_spills": [],
            "tanker_oil_spills": [],
        }
        added = []
        limit = 0
        for water in self.location:
            for human_impact in water.humanimpact:
                if human_impact.id not in added:
                    return_dict[human_impact.subcategory]\
                    .append(human_impact.id)
                    added.append(human_impact.id)
                    limit += 1
                    if limit >= 10:
                        return return_dict
        return return_dict

    def __repr__(self):
        return f"Fish('{self.scientific_name}')"


class BodiesOfWater(db.Model):
    """
    SQLAlchemy Model of a Water database entry.
    """

    __tablename__ = "bodies_of_water"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True,
        nullable=False, default="No Name")
    type = db.Column(db.String(100), nullable=False, default="No Type")
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    min_latitude = db.Column(db.Float)
    min_longitude = db.Column(db.Float)
    max_latitude = db.Column(db.Float)
    max_longitude = db.Column(db.Float)
    locationname = db.Column(db.String(200))
    imageurl = db.Column(db.String(200))
    # Degrees C
    water_temp = db.Column(db.Float)

    # Wind speed, in km/h
    wind_speedkmph = db.Column(db.Float)

    # Surface area of the water, in km^2
    size = db.Column(db.Integer)

    @property
    def serialized(self):
        """
        Return object data in serializeable format
        """

        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "min_latitude": self.min_latitude,
            "min_longitude": self.min_longitude,
            "max_latitude": self.max_latitude,
            "max_longitude": self.max_longitude,
            "water_temp": self.water_temp,
            "wind_speedkmph": self.wind_speedkmph,
            "locationname": self.locationname,
            "imageurl": self.imageurl,
            "size": float(self.size),
            "model": "bodies_of_water",
        }

    def get_human(self):
        """
        Gets the human impacts which affect that body of water.

            Returns: A list of the human impact id's.
        """

        human_list = []
        limit = 0
        for human_impact in self.humanimpact:
            if human_impact.id not in human_list:
                human_list.append(human_impact.id)
                limit += 1
                if limit >= 10:
                    return human_list
        return human_list

    def get_fish(self):
        """
        Gets the fish which are found in this body of water.

            Returns: A list of fish ids.
        """

        fish_list = []
        limit = 0
        for fish in self.fish:
            if fish.id not in fish_list:
                fish_list.append(fish.id)
                limit += 1
                if limit >= 10:
                    return fish_list
        return fish_list

    def __repr__(self):
        return f"Water('{self.name}')"


class HumanImpact(db.Model):
    """
    SQLAlchemy Model of a Human Impact database entry.
    """

    __tablename__ = "human_impact"
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100), nullable=False, default="No Category")
    subcategory = db.Column(db.String(100))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    # Date format: DD/MM/YYYY
    date = db.Column(db.String(100))

    description = db.Column(db.Text)
    name = db.Column(db.String(200))

    # For oil pollution, in metric tons
    oil_amount = db.Column(db.Integer)

    # For plastic pollution
    # count_density in units of km^-2
    # count_density_1: 0.33-1.00mm sized pieces
    # count_density_2: 1.01-4.75mm sized pieces
    # count_density_3: 4.76-200mm sized pieces
    # count_density_4: 200+mm sized pieces
    count_density_1 = db.Column(db.Float)
    count_density_2 = db.Column(db.Float)
    count_density_3 = db.Column(db.Float)
    count_density_4 = db.Column(db.Float)

    # For power plants
    plant_rating = db.Column(db.String(200))
    plant_location = db.Column(db.String(200))
    plant_water_source = db.Column(db.String(200))

    locationname = db.Column(db.String(200))
    imageurl = db.Column(db.String(200))

    # Relationships
    water_relationship = db.relationship(
        "BodiesOfWater",
        secondary=link,
        backref=db.backref("humanimpact", lazy="dynamic"),
    )

    @property
    def serialized(self):
        """
        Return object data in serializeable format
        """

        return {
            "id": self.id,
            "category": self.category,
            "subcategory": self.subcategory,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "date": self.date,
            "description": self.description,
            "name": self.name,
            "oil_amount": self.oil_amount,
            "count_density_1": self.count_density_1,
            "count_density_2": self.count_density_2,
            "count_density_3": self.count_density_3,
            "count_density_4": self.count_density_4,
            "plant_rating": self.plant_rating,
            "plant_location": self.plant_location,
            "plant_water_source": self.plant_water_source,
            "locationname": self.locationname,
            "imageurl": self.imageurl,
            "model": "human_impact",
        }

    def get_water(self):
        """
        Gets the bodies of water affected by this human impact.

            Returns: A list of dictionaries containing the id and name of
                     each body of water.
        """
        return_list = []
        limit = 0
        for water in self.water_relationship:
            return_list.append({"id": water.id, "name": water.name})
            limit += 1
            if limit >= 10:
                return return_list

        return return_list

    def get_fish(self):
        """
        Gets the fish affected by this human impact.

            Returns: A list of dictionaries containing the id and
                     scientific name of each fish.
        """

        return_list = []
        added = []
        limit = 0
        for water in self.water_relationship:
            for fish in water.fish:
                if fish.id not in added:
                    return_list.append(
                        {"id": fish.id, "scientific_name": fish.scientific_name}
                    )
                    added.append(fish.id)
                    limit += 1
                    if limit >= 10:
                        return return_list

        return return_list

    def __repr__(self):
        return f"Human Impact('{self.name}')"


if __name__ == "__main__":
    db.create_all()
