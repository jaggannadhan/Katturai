from flask import Blueprint, render_template, request, json
from flask import session, redirect, url_for, jsonify
from src.services.DecoratorService import login_required, check_user_uid, login_required_strict
from src.services.UserService import UserService

user = Blueprint("user", __name__)


@user.route("/<user_uid>/", methods=["GET"])
@check_user_uid
def homePage(user_uid):
    print(user_uid)
    return render_template("index.html")

@user.route("/<user_uid>/diary", methods=["GET"])
@login_required
@check_user_uid
def diary(user_uid):
    return render_template("index.html")

@user.route("/<user_uid>/travel", methods=["GET"])
@check_user_uid
def travel(user_uid):
    print(user_uid)
    return render_template("index.html")

@user.route("/<user_uid>/portfolio", methods=["GET"])
@check_user_uid
def portfolio(user_uid):
    print(user_uid)
    return render_template("index.html")

@user.route("/<user_uid>/opinion", methods=["GET"])
@check_user_uid
def opinion(user_uid):
    print(user_uid)
    return render_template("index.html")

@user.route("/<user_uid>/recreation", methods=["GET"])
@check_user_uid
def recreation(user_uid):
    print(user_uid)
    return render_template("index.html")

@user.route("/<user_uid>/profile", methods=["GET"])
@login_required
@check_user_uid
def profileSettings(user_uid):
    print(user_uid)
    return render_template("index.html")

@user.route("/<user_uid>/userDetails", methods=["POST"])
@login_required_strict
def setUserDetails(user_uid):
    profileData = json.loads(request.data)
    print(user_uid, profileData)

    user_details, success = UserService.setUserDetails(user_uid, profileData)
    return jsonify({
        "success": True if user_details else False  ,
        "user_details": user_details
    })

@user.route("/<user_uid>/getCurrentUser", methods=["GET"])
@check_user_uid
def getCurrentUser(user_uid):
    user = session.get("user")
    if not user:
        return jsonify({
            "success": False,
            "current_user": None
        })

    current_user = UserService.getCurrentUser(user.get("email"), user_uid)
    return jsonify({
        "success": True,
        "current_user": current_user 
    })

@user.route('/<user_uid>/logout')
@login_required
def logout(user_uid):
    session.pop('user', None)
    return redirect(url_for("default.signin"))