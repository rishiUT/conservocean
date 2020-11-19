from flask_sqlalchemy import SQLAlchemy
from database import db, link

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
            return_list.append({"id": water.id, "name": water.name \
                ,"image": water.imageurl})
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
                        {"id": fish.id, "scientific_name": \
                        fish.scientific_name, "image": fish.picture_url}
                    )
                    added.append(fish.id)
                    limit += 1
                    if limit >= 10:
                        return return_list

        return return_list

    def __repr__(self):
        return f"Human Impact('{self.name}')"
