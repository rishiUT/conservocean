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


if __name__ == "__main__":
    db.create_all()
