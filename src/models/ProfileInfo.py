from google.cloud import datastore
from google.cloud.datastore.query import PropertyFilter
from google.cloud.datastore.key import Key
from datetime import datetime
import traceback
from src.AppSecrets import AppSecrets

PROFILEINFO = datastore.Client(AppSecrets.PROJECT_ID)

class ProfileInfo:
    kind = "ProfileInfo"

    @classmethod
    def getProfileInfo(cls, user_uid):
        print(f"Retrieving profile: {user_uid}")
        try:
            entity = PROFILEINFO.get(PROFILEINFO.key(cls.kind, user_uid))
            return dict(entity), f"Successully retrieved profile: {user_uid}"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to retrieve profile: {user_uid}!"
        
        
    @classmethod
    def createProfile(cls, user_uid, profile_details={}):
        print(f"Create user profile: {user_uid}")
        try:
            new_entity = datastore.Entity(PROFILEINFO.key(cls.kind, user_uid))
            new_entity["title"] = profile_details.get("title", "")
            new_entity["tagline"] = profile_details.get("tagline", "")
            new_entity["subtext"] = profile_details.get("subtext", "")

            new_entity["github"] = profile_details.get("github", "")
            new_entity["youtube"] = profile_details.get("youtube", "")
            new_entity["linkedin"] = profile_details.get("linkedin", "")
            new_entity["instagram"] = profile_details.get("instagram", "")

            new_entity["epigraph"] = profile_details.get("epigraph", "")

            new_entity["last_updated"] = datetime.now()
            PROFILEINFO.put(new_entity)

            return dict(new_entity), f"Successully created profile: {user_uid}"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to create profile: {user_uid}"
    
    @classmethod
    def updateUserProfile(cls, user_uid, user_details):
        print(f"Updating user profile: {user_uid} login")
        try:
            entity, msg = cls.getProfileInfo(user_uid)

            if not entity:
                return False, f"No profile: {user_uid} found"
            
            entity["title"] = user_details.get("title", "")
            entity["tagline"] = user_details.get("tagline", "")
            entity["subtext"] = user_details.get("subtext", "")

            entity["github"] = user_details.get("github", "")
            entity["youtube"] = user_details.get("youtube", "")
            entity["linkedin"] = user_details.get("linkedin", "")
            entity["instagram"] = user_details.get("instagram", "")

            entity["epigraph"] = user_details.get("epigraph", "")

            entity["last_updated"] = datetime.now()
            PROFILEINFO.put(entity)

            return dict(entity), f"Successully updated user profile: {user_uid}"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to update user profile: {user_uid}!"

    @classmethod   
    def deleteUserProfile(cls, user_uid):
        print(f"Deleteing user profile: {user_uid}")
        try:
            entity = cls.getProfileInfo(user_uid)
            if not entity:
                raise Exception
            PROFILEINFO.delete(entity.key)

            return True, f"Successfully deleted user profile: {user_uid}"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to delete user profile: {user_uid}!"
        
    