from flask_sqlalchemy import SQLAlchemy
from database import db, link


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
        added = []
        limit = 0
        for human_impact in self.humanimpact:
            if human_impact.id not in added:
                human_list.append({"id": human_impact.id, "name": \
                human_impact.name, "image": human_impact.imageurl })
                added.append(human_impact.id)
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
                fish_list.append({"id": fish.id, \
                    "name": fish.scientific_name, "image": fish.picture_url})
                limit += 1
                if limit >= 10:
                    return fish_list
        return fish_list

    def __repr__(self):
        return f"Water('{self.name}')"