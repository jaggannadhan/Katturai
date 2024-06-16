from flask import Flask
from src.handlers.DefaultHandler import default

app = Flask(__name__)
app.register_blueprint(default)

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    app.host = "0.0.0.0"
    app.port = 5000
    app.debug = True
    app.run()