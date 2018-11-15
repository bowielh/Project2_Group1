# import libraries
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

# flask setup
app = Flask(__name__)

from flask_sqlalchemy import SQLAlchemy



# database setup
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"

db = SQLAlchemy(app)


#create database model
class marijuana(db.Model):
    __tablename__ = #need to add name
    
from .models import marijuana

# homepage route
@app.route("/")
def home():
    return render_template("index.html")

# add routes as necessary

@app.route("/")
def home():
    return render_template("analysis.html")

@app.route("/")
def home():
    return render_template("observations.html")

@app.route("conclusion.html")
def home():
    return render_template("conclusion.html")





# command line requirement
if __name__ == "__main__":
    app.run()
