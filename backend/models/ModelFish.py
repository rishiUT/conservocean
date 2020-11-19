from flask_sqlalchemy import SQLAlchemy
from database import db, link
class Fish(db.Model):
    """
    SQLAlchemy Model of a Fish database entry.
    """

    __tablename__ = "fish"
    id = db.Column(db.Integer, primary_key=True)
    scientific_name = db.Column(
        db.String(100), unique=True, nullable=False,
        default="No Scientific Name"
    )
    common_name = db.Column(db.String(100), nullable=False,
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
            return_list.append({"id": water.id, "name": water.name,\
                "image": water.imageurl})
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
                        .append({"id": human_impact.id, "name": \
                            human_impact.name, "image": \
                            human_impact.imageurl })
                    added.append(human_impact.id)
                    limit += 1
                    if limit >= 10:
                        return return_dict
        return return_dict

    def __repr__(self):
        return f"Fish('{self.scientific_name}')"
