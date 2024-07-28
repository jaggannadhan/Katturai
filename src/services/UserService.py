
from src.models.UserInfo import UserInfo
from src.models.ProfileInfo import ProfileInfo
from src.models.PortfolioInfo import PortfolioInfo

class UserService:

    def getCurrentUser(email, user_uid):
        userInfo, user_msg = UserInfo.getUser(email)
        profileInfo, profile_msg = ProfileInfo.getProfile(user_uid)
        portfolioInfo, portfolio_msg = PortfolioInfo.getPortfolio(user_uid)
        
        print(f"\n\n>>>>>>>>>>>>>>>>>>>>>getCurrentUser service<<<<<<<<<<<<<<<<<<<<<<<<<")
        print(f"userInfo: {userInfo}, msg: {user_msg}\n\n")
        print(f"profileInfo: {profileInfo}, msg: {profile_msg}\n\n")
        print(f"portfolioInfo: {portfolioInfo}, msg: {portfolio_msg}\n\n")
        print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n\n")

        current_user = {
            "user_info": userInfo,
            "profile_info": profileInfo,
            "portfolio_info": portfolioInfo
        }
        return current_user
    
    def setUserDetails(user_uid, user_details):
        user, msg = UserInfo.updateUser(user_uid, user_details)
        return user, msg
    
    def setProfileDetails(user_uid, profile_details):
        user, msg = ProfileInfo.updateProfile(user_uid, profile_details)
        return user, msg
    
    def setPortfolioDetails(user_uid, portfolio_details):
        user, msg = PortfolioInfo.updatePortfolio(user_uid, portfolio_details)
        return user, msg
