from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:iloveocean@conservoceandb.c5r36pk562sk.us-east-2.rds.amazonaws.com:5432/conservocean'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

link = db.Table('links',
    db.Column('fish_id', db.Integer, db.ForeignKey('fish.id')),
    db.Column('water_id', db.Integer, db.ForeignKey('bodies_of_water.id')),
    db.Column('human_id', db.Integer, db.ForeignKey('human_impact.id')))

class Fish(db.Model):
    __tablename__ = "fish"
    id = db.Column(db.Integer, primary_key=True)
    scientific_name = db.Column(db.String(100), unique=True, nullable=False, default="No Scientific Name")
    common_name = db.Column(db.String(100), nullable=False, default="No Common Name")
    species = db.Column(db.String(100), unique=False, nullable=False, default="No Species")
    genus = db.Column(db.String(100), nullable=False, default="No Genus")
    family = db.Column(db.String(100), nullable=False, default="No Family")

    # String of 3 numbers:
    # -1 0 0: Freshwater fish
    # 0 -1 0: Brachish fish
    # 0 0 -1: Saltwater fish
    # Can be a combination of those values to 
    # show it lives in more than one type of water
    habitat = db.Column(db.String(100), nullable=False, default="No Habitat")

    endanger_status = db.Column(db.String(100), nullable=False, default="No Endanger Status")
    population_trend = db.Column(db.String(100), nullable=False)
    preferred_temp = db.Column(db.Integer)
    average_size = db.Column(db.Integer)
    picture_url = db.Column(db.String(200))
    description = db.Column(db.Text)
    speccode = db.Column(db.Integer)

    # For overfishing
    catch_year = db.Column(db.String(4))
    catch_rate = db.Column(db.Integer)

    # Relationships
    location = db.relationship('BodiesOfWater', secondary=link, backref=db.backref('fish', lazy='dynamic'))

    @property
    def serialized(self):
        """Return object data in serializeable format"""
        return {
            'id': self.id,
            'scientific_name': self.scientific_name,
            'common_name': self.common_name,
            'species': self.species,
            'genus': self.genus,
            'family': self.family,
            'habitat': self.habitat,
            'endanger_status': self.endanger_status,
            'population_trend': self.population_trend,
            'average_size': self.average_size,
            'picture_url': self.picture_url,
            'description': self.description,
            'speccode': self.speccode,
            'catch_year': self.catch_year,
            'catch_rate': self.catch_rate,
        }

    def get_water(self):
        return [{"id":item.id, "name":item.name} for item in self.location]

    def get_human(self):
        return_dict = {'plastic_pollution': [], 'coal_power_plants': [], 'offshore_oil_spills': [], 'tanker_oil_spill':[]}
        added = []
        for water in self.location:
            for human_impact in water.humanimpact:
                if human_impact.id not in added:
                    return_dict[human_impact.subcategory].append(human_impact.id)
                    added.append(human_impact.id)
        return return_dict

    def __repr__(self):
        return f"Fish('{self.scientific_name}' '{self.catch_rate}')"

class BodiesOfWater(db.Model):
    __tablename__= "bodies_of_water"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False, default="No Name")
    type = db.Column(db.String(100), nullable=False, default="No Type")
    latitude = db.Column(db.Integer)
    longitude = db.Column(db.Integer)
    min_latitude = db.Column(db.Integer)
    min_longitude = db.Column(db.Integer)
    max_latitude = db.Column(db.Integer)
    max_longitude = db.Column(db.Integer)
    water_temp = db.Column(db.Integer)
    tide_height = db.Column(db.Integer)
    size = db.Column(db.Integer)
    
    @property
    def serialized(self):
        """Return object data in serializeable format"""
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'min_latitude': self.min_latitude,
            'min_longitude': self.min_longitude,
            'max_latitude': self.max_latitude,
            'max_longitude': self.max_longitude,
            'water_temp': self.water_temp,
            'tide_height': self.tide_height,
            'size': self.size
        }
    
    def get_human(self):
        human_list = []
        for human_impact in self.humanimpact:
            if human_impact.id not in human_list:
                human_list.append(human_impact.id)
        return human_list
    
    def get_fish(self):
        fish_list = []
        for fish in self.fish:
            if fish.id not in fish_list:
                fish_list.append(fish.id)
        return fish_list

    def __repr__(self):
        return f"Water('{self.name}')"


class HumanImpact(db.Model):
    __tablename__ = "human_impact"
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(100), nullable=False, default="No Category")
    subcategory = db.Column(db.String(100))
    latitude = db.Column(db.Integer)
    longitude = db.Column(db.Integer)
    date = db.Column(db.String(100))
    description = db.Column(db.Text)
    name = db.Column(db.String(200))
    
    # For oil pollution
    oil_amount = db.Column(db.Integer)

    # For plastic pollution
    # count_density in units of km^-2
    # count_density_1: 0.33-1.00mm sized pieces
    # count_density_2: 1.01-4.75mm sized pieces
    # count_density_3: 4.76-200mm sized pieces
    # count_density_4: 200+mm sized pieces
    count_density_1 = db.Column(db.Integer)
    count_density_2 = db.Column(db.Integer)
    count_density_3 = db.Column(db.Integer)
    count_density_4 = db.Column(db.Integer)

    # For power plants
    plant_rating = db.Column(db.String(200))
    plant_location = db.Column(db.String(200))
    plant_water_source = db.Column(db.String(200))

    # Relationships
    water_relationship = db.relationship("BodiesOfWater", secondary=link, backref=db.backref('humanimpact', lazy='dynamic'))

    @property
    def serialized(self):
        """Return object data in serializeable format"""
        return {
            'id': self.id,
            'category': self.category,
            'subcategory': self.subcategory,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'date': self.date,
            'description': self.description,
            'name': self.name,
            'oil_amount': self.oil_amount,
            'count_density_1': self.count_density_1,
            'count_density_2': self.count_density_2,
            'count_density_3': self.count_density_3,
            'count_density_4': self.count_density_4,
            'plant_rating': self.plant_rating,
            'plant_location': self.plant_location,
            'plant_water_source': self.plant_water_source,
        }

    def get_water(self):
        return [{"id": item.id, "name": item.name} for item in self.water_relationship]

    def get_fish(self):
        return_list = []
        added = []
        for water in self.water_relationship:
            for fish in water.fish:
                if fish.id not in added:
                    return_list.append(
                        {"id": fish.id, "scientific_name": fish.scientific_name})
                    added.append(fish.id)
        return return_list

    def __repr__(self):
        return f"Human Impact('{self.name}')"

