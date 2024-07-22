from google.cloud import datastore
from google.cloud.datastore.query import PropertyFilter
from datetime import datetime
import traceback
from src.AppSecrets import AppSecrets

USERINFO = datastore.Client(AppSecrets.PROJECT_ID)

class UserInfo:
    kind = "UserInfo"

    @classmethod
    def getUser(cls, email):
        print(f"Retrieving user: {email}")
        try:
            query = USERINFO.query(kind=cls.kind)
            query.add_filter(filter=PropertyFilter("email", "=", email))
            entity = list(query.fetch())

            entity = entity[0] if entity else None
            return entity, f"Successully retrieved user: {email}"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to retrieve user: {email}!"
        
    @classmethod
    def addUser(cls, email, user_name):
        print(f"Adding user: {email} to UserInfo")
        try:
            new_entity = datastore.Entity(USERINFO.key(cls.kind))
            new_entity["email"] = email
            new_entity["name"] = user_name
            new_entity["last_login"] = datetime.now()
            USERINFO.put(new_entity)

            return new_entity, f"Successully added {email}"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to add user: {email}"
    
    @classmethod
    def updateUserLogin(cls, email):
        print(f"Updating user: {email} login")
        try:
            query = USERINFO.query(kind=cls.kind)
            query.add_filter(filter=PropertyFilter("email", "=", email))
            entity = list(query.fetch())

            if entity:
                entity= entity[0] 
            else:
                return False, f"No user: {email} found"
            
            entity["last_login"] = datetime.now()
            USERINFO.put(entity)

            return entity, f"Successully updated user: {email} login"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to update user: {email} login!"

    @classmethod   
    def deleteUser(cls, email):
        print(f"Deleteing user: {email}")
        try:
            query = USERINFO.query(kind=cls.kind)
            query.add_filter(filter=PropertyFilter("email", "=", email))
            entities = list(query.fetch())
            
            # Delete the fetched entities in a batch
            keys = [entity.key for entity in entities]
            USERINFO.delete_multi(keys)

            return True, f"Successfully deleted user: {email}"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to delete user: {email}!"
        
    