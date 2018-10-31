# import libraries
import flask

# flask setup
app = Flask(__name__)

# database setup

# homepage route
@app.route("/")
def home():
    return render_template("index.html")

# add routes as necessary

# command line requirement
if __name__ == "__main__":
    app.run()
