from flask import Blueprint, render_template
from flask import session, redirect, url_for, jsonify
from src.services.DefaultService import DefaultService
from src.models.UserInfo import UserInfo

default = Blueprint("default", __name__)


@default.route("/")
def landingPage():
    return render_template("index.html")


@default.route("/home")
def homePage():
    user = session.get("user")
    print(f">>>>>>>>HOME PAGE ROUTE SESSION: {user}<<<<<<<<")
    if not user:
        return redirect("./signin")
    return render_template("index.html")

@default.route("/getCurrentUser", methods=["GET"])
def getCurrentUser():
    user = session.get("user")
    if not user:
        return None

    userInfo, msg = UserInfo.getUser(user.get("email"))
    picture = user.get("picture")
    
    userInfo = dict(userInfo)
    userInfo["picture"] = picture

    print(userInfo)
    return jsonify(userInfo)