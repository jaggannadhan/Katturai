from google.cloud import datastore
from datetime import datetime
import traceback
from src.AppSecrets import AppSecrets

PORTFOLIOINFO = datastore.Client(AppSecrets.PROJECT_ID)

class PortfolioInfo:
    kind = "PortfolioInfo"

    @classmethod
    def getPortfolio(cls, user_uid, _getdict=True):
        print(f"Retrieving portfolio: {user_uid}")
        try:
            entity = PORTFOLIOINFO.get(PORTFOLIOINFO.key(cls.kind, user_uid))

            entity = (dict(entity) if _getdict else entity) if entity else None
            return entity, f"Successully retrieved portfolio: {user_uid}"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to retrieve portfolio: {user_uid}!"
        
        
    @classmethod
    def createPortfolio(cls, user_uid, portfolio_details={}):
        print(f"Create user portfolio: {user_uid}")
        try:
            entity, msg = cls.getPortfolio(user_uid)
            if entity:
                return entity, f"Portfolio: {user_uid} already exists"
            
            new_entity = datastore.Entity(PORTFOLIOINFO.key(cls.kind, user_uid))
            new_entity["greetings"] = portfolio_details.get("greetings", "")
            new_entity["titles"] = portfolio_details.get("titles", [])
            new_entity["description"] = portfolio_details.get("description", "")

            new_entity["resume"] = portfolio_details.get("resume", "")
            new_entity["skills"] = portfolio_details.get("skills", [])
            new_entity["buy_me_something"] = portfolio_details.get("buy_me_something", [])
            new_entity["last_updated"] = datetime.now()
            
            PORTFOLIOINFO.put(new_entity)

            return dict(new_entity), f"Successully created portfolio: {user_uid}"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to create portfolio: {user_uid}"
    
    @classmethod
    def updatePortfolio(cls, user_uid, portfolio_details):
        print(f"Updating user portfolio: {user_uid}")
        try:
            entity, msg = cls.getPortfolio(user_uid, _getdict=False)

            if not entity:
                return False, f"No portfolio: {user_uid} found"
            
            entity.update({
                "greetings": portfolio_details.get("greetings", entity["greetings"]),
                "titles": portfolio_details.get("titles", entity["titles"]),
                "description": portfolio_details.get("description", entity["description"]),

                "resume": portfolio_details.get("resume", entity["resume"]),
                "skills": portfolio_details.get("skills", entity["skills"]),
                "buy_me_something": portfolio_details.get("buy_me_something", entity["buy_me_something"]),
                "last_updated": datetime.now()
            })
            PORTFOLIOINFO.put(entity)

            return dict(entity), f"Successully updated user portfolio: {user_uid}"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to update user portfolio: {user_uid}!"

    @classmethod   
    def deletePortfolio(cls, user_uid):
        print(f"Deleteing user portfolio: {user_uid}")
        try:
            entity = cls.getPortfolio(user_uid)
            if not entity:
                raise Exception
            PORTFOLIOINFO.delete(entity.key)

            return True, f"Successfully deleted user portfolio: {user_uid}"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to delete user portfolio: {user_uid}!"
        
    