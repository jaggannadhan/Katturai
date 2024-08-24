from flask import Blueprint, render_template, request, json
from flask import session, redirect, url_for, jsonify
from src.services.DecoratorService import login_required, check_user_uid, login_required_strict
from src.services.UserService import UserService

user = Blueprint("user", __name__)


@user.route("/<user_uid>/", methods=["GET"])
@check_user_uid
def homePage(user_uid, userInfo, isLoggedIn):
    print(user_uid)
    return render_template("index.html")

@user.route("/<user_uid>/diary", methods=["GET"])
@login_required_strict
def diary(user_uid):
    return render_template("index.html")

@user.route("/<user_uid>/travel", methods=["GET"])
@check_user_uid
def travel(user_uid, userInfo, isLoggedIn):
    print(user_uid)
    return render_template("index.html")

@user.route("/<user_uid>/portfolio", methods=["GET"])
@check_user_uid
def portfolio(user_uid, userInfo, isLoggedIn):
    print(user_uid)
    return render_template("index.html")


@user.route("/<user_uid>/profile", methods=["GET"])
@login_required_strict
def profileSettings(user_uid):
    print(user_uid)
    return render_template("index.html")

@user.route("/<user_uid>/userDetails", methods=["POST"])
@login_required_strict
def setUserDetails(user_uid):
    userDetails = json.loads(request.data)
    print(user_uid, userDetails)

    user_details, success = UserService.setUserDetails(user_uid, userDetails)
    return jsonify({
        "success": True if user_details else False,
        "user_details": user_details
    })

@user.route("/<user_uid>/profileDetails", methods=["POST"])
@login_required_strict
def setProfileDetails(user_uid):
    profileDetails = json.loads(request.data)
    print(user_uid, profileDetails)

    profile_details, success = UserService.setProfileDetails(user_uid, profileDetails)
    return jsonify({
        "success": True if profile_details else False,
        "profile_details": profile_details
    })

@user.route("/<user_uid>/portfolioDetails", methods=["POST"])
@login_required_strict
def setPortfolioDetails(user_uid):
    portfolioDetails = json.loads(request.data)
    print(user_uid, portfolioDetails)

    portfolio_details, success = UserService.setPortfolioDetails(user_uid, portfolioDetails)
    return jsonify({
        "success": True if portfolio_details else False,
        "portfolio_details": portfolio_details
    })

@user.route("/<user_uid>/getCurrentUser", methods=["GET"])
@check_user_uid
def getCurrentUser(user_uid, userInfo, isLoggedIn):
    current_user = UserService.getCurrentUser(user_uid, userInfo, isLoggedIn)
    return jsonify({
        "success": True,
        "current_user": current_user 
    })

@user.route("/<user_uid>/sendEmail", methods=["POST"])
@check_user_uid
def sendEmail(user_uid, userInfo, isLoggedIn):
    data = json.loads(request.data)
    print(f"send email req body: {data}")

    success, msg = UserService.sendEmail(userInfo, data)
    return jsonify({
        "success": success,
        "message":  msg
    })

@user.route('/<user_uid>/logout')
@login_required
def logout(user_uid):
    session.pop('user', None)
    return redirect(url_for("default.signin"))