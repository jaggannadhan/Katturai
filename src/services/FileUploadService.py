from google.cloud import storage
import os, traceback
from src.AppSecrets import AppSecrets

STORAGE_CLIENT = storage.Client(AppSecrets.PROJECT_ID)

class FileUploadService:

    @classmethod
    def createBucket(user_uid):
        try:
            bucket = STORAGE_CLIENT.create_bucket(user_uid)
            return bucket, f"Sucessfully created bucket for user: {user_uid}!"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to create bucket for user: {user_uid}!"
            

    @classmethod
    def uploadFile(cls, user_uid, fileName):
        bucket = STORAGE_CLIENT.bucket(user_uid)

        if not bucket:
            bucket = cls.createBucket(user_uid)

        blob = bucket.blob(fileName.split("/")[-1])
        blob.upload_from_filename(fileName)
        blob.make_public()
        public_url = blob.public_url
        print(f"File uploaded to {public_url}")
        os.remove(fileName)
        return public_url


    @classmethod
    def deleteBucket(user_uid):
        try:
            bucket = STORAGE_CLIENT.get_bucket(user_uid)
            bucket.delete()
            return True, f"Bucket {user_uid} deleted"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to delete bucket for user: {user_uid}!"

