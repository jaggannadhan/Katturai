from flask import Blueprint, render_template
from flask import session, redirect, url_for, jsonify

default = Blueprint("default", __name__)


@default.route("/", methods=["GET"])
def landingPage():
    user = session.get("user")
    if user:
        return redirect(url_for("user.homePage", user_uid="jaggannadhan"))
    return render_template("index.html")

@default.route("/signin", methods=["GET"])
def signin():
    user = session.get("user")
    if user:
        return redirect(url_for("user.homePage", user_uid="jaggannadhan"))
    return render_template("index.html")
