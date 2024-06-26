from flask import Blueprint, render_template, request, jsonify
from src.services.DefaultService import DefaultService
default = Blueprint("default", __name__)

@default.route("/")
def rerouteToLogin():
    return render_template("index.html")

