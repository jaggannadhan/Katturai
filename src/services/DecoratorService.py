from flask import session, redirect, url_for, render_template
from functools import wraps
from src.models.UserInfo import UserInfo

def login_required(handle):
    @wraps(handle)
    def wrapper(user_uid):
        user = session.get("user")
        print(f">>>>>>>>@login_required: {user}<<<<<<<<")
        if not user:
            return redirect("/signin")

        userInfo, msg = UserInfo.getUser(user.get("email"))
        if not userInfo:
            session.pop('user', None)
            return redirect("/signin")
        
        action = handle(user_uid)
        return action
    return wrapper


def handle_loggedin_user(handle):
    @wraps(handle)
    def wrapper():
        user = session.get("user")
        print(f">>>>>>>>@handle_loggedin_user: {user}<<<<<<<<")
        if not user:
            return handle()
            
        userInfo, msg = UserInfo.getUser(user.get("email"))
        if not userInfo:
            session.pop('user', None)
            return handle()
        
        return redirect(url_for("user.homePage", user_uid=userInfo.get("user_uid")))

    return wrapper

def check_user_uid(handle):
    @wraps(handle)
    def wrapper(user_uid):
            
        userInfo, msg = UserInfo.getUserByUID(user_uid)
        if not userInfo:
            return render_template("pageNotFound.html")
            
        return handle(user_uid)
    return wrapper

def login_required_strict(handle):
    @wraps(handle)
    def wrapper(user_uid):
        loggedInUser = session.get("user")
        print(f">>>>>>>>@login_required_strict: {loggedInUser}<<<<<<<<")
        if not loggedInUser:
            return redirect("/signin")
        
        loggedInEmail = loggedInUser.get("email")

        userInfo, msg = UserInfo.getUser(loggedInEmail)
        if not userInfo:
            session.pop('user', None)
            return redirect("/signin")
    
        if userInfo.get("user_uid") != user_uid:
            return render_template("pageNotFound.html")
            
        return handle(user_uid)
    return wrapper