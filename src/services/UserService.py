
import traceback
from src.models.UserInfo import UserInfo
from src.models.ProfileInfo import ProfileInfo
from src.models.PortfolioInfo import PortfolioInfo
from src.AppSecrets import AppSecrets

from mailjet_rest import Client
api_key = AppSecrets.MJ_APIKEY_PUBLIC
api_secret = AppSecrets.MJ_APIKEY_PRIVATE
mailjet = Client(auth=(api_key, api_secret), version='v3.1')


class UserService:

    def getCurrentUser(user_uid, userInfo, isLoggedIn):
        # userInfo, user_msg = UserInfo.getUserByUID(user_uid)
        profileInfo, profile_msg = ProfileInfo.getProfile(user_uid)
        portfolioInfo, portfolio_msg = PortfolioInfo.getPortfolio(user_uid)
        
        print(f"\n\n>>>>>>>>>>>>>>>>>>>>>getCurrentUser service<<<<<<<<<<<<<<<<<<<<<<<<<")
        print(f"userInfo: {userInfo}\n\n")
        print(f"profileInfo: {profileInfo}, msg: {profile_msg}\n\n")
        print(f"portfolioInfo: {portfolioInfo}, msg: {portfolio_msg}\n\n")
        print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n\n")

        current_user = {
            "is_logged_in": True if isLoggedIn else False,
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


    def sendEmail(userInfo, reqBody):
        try:
            toName = userInfo.get("first_name")
            toEmail = userInfo.get("email")
            fromEmail = reqBody.get("email")
            subject = reqBody.get("subject")
            message = reqBody.get("message")

            data = {
                'Messages': [
                    {
                        "From": {
                            "Email": "Katturai.ing4u@gmail.com",
                            "Name": "Katturai"
                        },
                        "To": [
                            {
                                "Email": toEmail,
                                "Name": toEmail.split('@')[0]
                            }
                        ],
                        "Subject": subject,
                        # "TextPart": message,
                        "HTMLPart": f"<h3>Dear {toName},</h3><br/> \
                            <p>You have a message from <b>{fromEmail}.</b></p><br/> \
                            <b>Message: </b><br/> \
                            <p>{message}</p> \
                            <b>Regards,</b><br/><b>Team Katturai</b><br/>" 
                        
                    }
                ]
            }

            result = mailjet.send.create(data=data)
            print(result.status_code)
            print(result.json())

            return True, "Email Sent Successfully"
        
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to send email!"