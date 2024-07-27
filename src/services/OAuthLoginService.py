from src.models.UserInfo import UserInfo

class OAuthLoginService:

    def addUserIfNotExists(userInfo):
        if not userInfo:
            return None
        
        print(userInfo)
        email = userInfo.get("email")
        user, msg = UserInfo.getUser(email)

        if not user:
            user, msg = UserInfo.addUser(userInfo)
            
        print(f">>>>>User entity: {user}, msg: {msg}<<<<<")
        return user, msg