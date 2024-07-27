
from src.models.UserInfo import UserInfo
from src.models.ProfileInfo import ProfileInfo

class UserService:

    def getCurrentUser(email, user_uid):
        userInfo, user_msg = UserInfo.getUser(email)
        profileInfo, profile_msg = ProfileInfo.getProfileInfo(user_uid)
        
        print(f">>>>>>>>>>>>>>>>>>>>getCurrentUser service:")
        print(f"userInfo: {userInfo}, msg: {user_msg} \n")
        print(f"profileInfo: {profileInfo}, msg: {profile_msg}<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")

        current_user = {
            "user_info": userInfo,
            "profile_info": profileInfo
        }
        return current_user
    
    def setUserDetails(user_uid, user_details):
        user, msg = UserInfo.updateUser(user_uid, user_details)
        return user, msg
