from flask import Flask, render_template
from src.handlers.DefaultHandler import default
from src.handlers.OAuthLoginHandler import login
from src.AppSecrets import AppSecrets

app = Flask(__name__)
app.secret_key = AppSecrets.SECRET_KEY

app.register_blueprint(default)
app.register_blueprint(login)

@app.errorhandler(404)
def not_found(e):
    return render_template("pageNotFound.html")

################# UNCOMMENT THESE LINES WHILE DEPLOYING IN LOCAL ENV #####################

# from google.cloud import storage
# import os
# credential_path = "/Users/jv/.config/gcloud/application_default_credentials.json"
# os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path

##########################################################################################

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    app.host = "0.0.0.0"
    app.port = 5000
    app.debug = True
    app.run()