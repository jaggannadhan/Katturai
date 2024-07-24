
from flask import url_for, session, Blueprint, current_app, request
from flask import render_template, redirect
from authlib.integrations.flask_client import OAuth
from src.services.OAuthLoginService import OAuthLoginService
from src.AppSecrets import AppSecrets

login = Blueprint("login", __name__)

oauth = OAuth(current_app)
oauth.register(
    name='google',
    client_id=AppSecrets.CLIENT_ID,
    client_secret=AppSecrets.CLIENT_SECRET,
    client_kwargs=AppSecrets.CLIENT_KWARGS,
    server_metadata_url= 'https://accounts.google.com/.well-known/openid-configuration'
)

@login.route('/glogin')
def loginWithGoogle():
    google = oauth.create_client('google')
    redirect_uri = url_for('login.authorize', _external=True)
    return google.authorize_redirect(redirect_uri)


@login.route('/oAuthorize')
def authorize():
    google = oauth.create_client('google')
    token = google.authorize_access_token()
    user_info = token.get('userinfo')

    current_user = OAuthLoginService.addUserIfNotExists(user_info)
    session['user'] = user_info
    print(user_info)
    return redirect(url_for("user.homePage", user_uid="jaggannadhan"))

