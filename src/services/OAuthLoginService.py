from src.models.UserInfo import UserInfo

class OAuthLoginService:

    def addUserIfNotExists(userInfo):
        if not userInfo:
            return None
        
        email = userInfo.get("email")
        name =  userInfo.get("name")
        user, msg = UserInfo.getUser(email)

        if not user:
            user, msg = UserInfo.addUser(email, name)
            
        print(f">>>>>User entity: {user}, msg: {msg}<<<<<")
        return user