from flask import session, redirect, url_for
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