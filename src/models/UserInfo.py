from google.cloud import datastore
from google.cloud.datastore.query import PropertyFilter
from datetime import datetime
import traceback
from src.AppSecrets import AppSecrets
from src.models.ProfileInfo import ProfileInfo
from src.models.PortfolioInfo import PortfolioInfo

USERINFO = datastore.Client(AppSecrets.PROJECT_ID)

class UserInfo:
    kind = "UserInfo"

    @classmethod
    def getUser(cls, email, _getdict=True):
        print(f"Retrieving user: {email}")
        try:
            query = USERINFO.query(kind=cls.kind)
            query.add_filter(filter=PropertyFilter("email", "=", email))
            entity = list(query.fetch())

            entity = (dict(entity[0]) if _getdict else entity[0]) if entity else None
            return entity, f"Successully retrieved user: {email}"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to retrieve user: {email}!"

        
    @classmethod
    def getUserByUID(cls, user_uid, _getdict=True):
        print(f"Retrieving user by uid: {user_uid}")
        try:
            query = USERINFO.query(kind=cls.kind)
            query.add_filter(filter=PropertyFilter("user_uid", "=", user_uid))
            entity = list(query.fetch())

            entity = (dict(entity[0]) if _getdict else entity[0]) if entity else None
            return entity, f"Successully retrieved user by uid: {entity} "
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to retrieve user by uid: {user_uid}!"

        
    @classmethod
    def addUser(cls, user_details):
        print(f"Adding user: {user_details} to UserInfo")
        try:
            email = user_details.get("email")
            user_name = user_details.get("name")
            picture = user_details.get("picture")

            entity, msg = cls.getUser(email)
            if entity:
                return entity, f"User: {email} already exists"

            new_entity = datastore.Entity(USERINFO.key(cls.kind))
            new_entity["email"] = email

            firstName, lastName = user_name.split(" ", 1)
            new_entity["first_name"] = firstName
            new_entity["last_name"] = lastName
            new_entity["name"] = user_name

            new_entity["address"] = ""
            new_entity["phone_number"] = ""

            new_entity["last_login"] = datetime.now()
            user_uid = email.split("@", 1)[0]
            new_entity["user_uid"] = user_uid
            new_entity["picture"] = picture

            user_profile, msg = ProfileInfo.createProfile(user_uid)
            if not user_profile:
                return False, msg
            
            user_portfolio, msg = PortfolioInfo.createPortfolio(user_uid)
            if not user_portfolio:
                return False, msg
            
            USERINFO.put(new_entity)
            return dict(new_entity), f"Successully created user: {email} and profiles!"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to add user: {email}"
    
    @classmethod
    def updateUserLogin(cls, email):
        print(f"Updating user: {email} login")
        try:
            entity = cls.getUser(email, _getdict=False)
            if not entity:
                return False, f"No user: {email} found"
            
            entity["last_login"] = datetime.now()
            USERINFO.put(entity)

            return dict(entity), f"Successully updated user: {email} login"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to update user: {email} login!"
        
    @classmethod
    def updateUser(cls, user_uid, user_details):
        print(f"Updating user: {user_details} to UserInfo")
        try:
            entity, msg = cls.getUserByUID(user_uid, _getdict=False)
            if not entity:
                raise Exception
            print("\n\nEntity in update:\n", entity, msg)

            entity.update({
                "first_name": user_details.get("first_name", entity["first_name"]),
                "last_name": user_details.get("last_name", entity["last_name"]),
                "address": user_details.get("address", entity["address"]),
                "phone_number": user_details.get("phone_number", entity["phone_number"])
            }) 
            USERINFO.put(entity)

            return dict(entity), f"Successully updated user: {user_uid} and profiles!"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to update user: {user_uid}"

    @classmethod   
    def deleteUser(cls, email):
        print(f"Deleteing user: {email}")
        try:

            entity = cls.getUser(email, _getdict=False)
            if not entity:
                raise Exception
            USERINFO.delete(entity.key)
        
            # USERINFO.delete_multi(keys)

            return True, f"Successfully deleted user: {email}"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to delete user: {email}!"
        
    