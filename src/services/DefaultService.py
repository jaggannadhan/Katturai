from flask import session, redirect
from functools import wraps
from src.models.UserInfo import UserInfo

def login_required(handle):
    @wraps(handle)
    def wrapper(user_uid):
        user = session.get("user")
        print(f">>>>>>>>HOME PAGE ROUTE SESSION: {user}<<<<<<<<")
        if not user:
            return redirect("/signin")

        userInfo, msg = UserInfo.getUser(user.get("email"))
        action = handle(user_uid)

        return action
    
    return wrapper