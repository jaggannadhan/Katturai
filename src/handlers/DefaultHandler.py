from flask import Blueprint, render_template
from flask import session, redirect, url_for, jsonify
from src.services.DecoratorService import handle_loggedin_user

default = Blueprint("default", __name__)


@default.route("/", methods=["GET"])
@handle_loggedin_user
def landingPage():
    return render_template("index.html")

@default.route("/signin", methods=["GET"])
@handle_loggedin_user
def signin():
    return render_template("index.html")
