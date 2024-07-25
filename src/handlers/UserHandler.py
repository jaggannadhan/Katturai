from flask import Blueprint, render_template
from flask import session, redirect, url_for, jsonify
from src.services.DecoratorService import login_required
from src.models.UserInfo import UserInfo

user = Blueprint("user", __name__)


@user.route("/<user_uid>/", methods=["GET"])
def homePage(user_uid):
    print(user_uid)
    return render_template("index.html")

@user.route("/<user_uid>/diary", methods=["GET"])
@login_required
def diary(user_uid):
    return render_template("index.html")

@user.route("/<user_uid>/travel", methods=["GET"])
def travel(user_uid):
    print(user_uid)
    return render_template("index.html")

@user.route("/<user_uid>/portfolio", methods=["GET"])
def portfolio(user_uid):
    print(user_uid)
    return render_template("index.html")

@user.route("/<user_uid>/opinion", methods=["GET"])
def opinion(user_uid):
    print(user_uid)
    return render_template("index.html")

@user.route("/<user_uid>/recreation", methods=["GET"])
def recreation(user_uid):
    print(user_uid)
    return render_template("index.html")

@user.route("/<user_uid>/getCurrentUser", methods=["GET"])
def getCurrentUser(user_uid):
    user = session.get("user")
    if not user:
        return jsonify({
            "success": False,
            "user_info": None 
        })

    userInfo, msg = UserInfo.getUser(user.get("email"))
    picture = user.get("picture")
    
    userInfo = dict(userInfo)
    userInfo["picture"] = picture

    print(userInfo)
    return jsonify({
        "success": True,
        "user_info": userInfo 
    })

@user.route('/<user_uid>/logout')
@login_required
def logout(user_uid):
    session.pop('user', None)
    return redirect(url_for("default.signin"))