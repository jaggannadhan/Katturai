from google.cloud import storage
from google.cloud import storage_control_v2
from google.cloud.storage import transfer_manager as TRANSFR_MGR
import os, traceback
from src.AppSecrets import AppSecrets


STORAGE_CLIENT = storage.Client(AppSecrets.PROJECT_ID)
STORAGE_CONTROL_CLIENT = storage_control_v2.StorageControlClient()


class FileUploadService:

    @classmethod
    def get_bucket(cls, user_uid):
        try:
            bucket = STORAGE_CLIENT.get_bucket(user_uid)
            return bucket, f"Successfully retreived cloud storage bucket: {user_uid}"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to retreive cloud storage bucket: {user_uid}"
        
    @classmethod
    def get_folder(cls, user_uid, folder_name):
        try:
            print(f"Retreving folder: {user_uid}/{folder_name}")
            folder_path = STORAGE_CONTROL_CLIENT.folder_path(
                project="_", bucket=user_uid, folder=folder_name
            )

            request = storage_control_v2.GetFolderRequest(
                name=folder_path,
            )
            response = STORAGE_CONTROL_CLIENT.get_folder(request=request)
            print(f"Get folder response: {response}")
            return response, f"Successfully retrived folder: {user_uid}/{folder_name}"
        except Exception:
            print(traceback.format_exc())
            return False, f"{user_uid}/{folder_name} does not exist!"
    
    @classmethod
    def createBucket(cls, user_uid):
        try:
            print(f"Creating cloud storage bucket: {user_uid}")

            bucket = STORAGE_CLIENT.bucket(user_uid)
            """Creates a bucket with hierarchical namespace enabled."""
            # bucket.iam_configuration.uniform_bucket_level_access_enabled = True
            # bucket.hierarchical_namespace_enabled = True
            bucket.create()

            return bucket, f"Sucessfully created bucket for user: {user_uid}!"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to create bucket for user: {user_uid}!"
        
    @classmethod
    def createBucketIfNotExists(cls, user_uid):
        try:
            print(f"In service createBucketIfNotExists: {user_uid}")
            bucket, msg = cls.get_bucket(user_uid)

            if bucket:
                print("Bucket exists")
                return bucket, msg
        
            bucket, msg = cls.createBucket(user_uid)
            return bucket, msg
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to create bucket for user: {user_uid}!"
        
    @classmethod
    def create_folder(user_uid, folder_name):
        try:
            # The storage bucket path uses the global access pattern, in which the "_"
            # denotes this bucket exists in the global namespace.
            project_path = STORAGE_CONTROL_CLIENT.common_project_path("_")
            bucket_path = f"{project_path}/buckets/{user_uid}"

            request = storage_control_v2.CreateFolderRequest(
                parent=bucket_path,
                folder_id=folder_name,
            )
            response = STORAGE_CONTROL_CLIENT.create_folder(request=request)

            print(f"Created folder: {response.name}")
            return True, f"Unable to create folder: {folder_name} in bucket: {user_uid}!"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to create folder: {folder_name} in bucket: {user_uid}!"
            

    @classmethod
    def uploadFile(cls, user_uid, file, fileType="resume"):
        try: 
            print(f"Uploading {fileType}, user: {user_uid}")
            fileName = file.filename
            print(f"file name: {fileName}")

            # Save file in temp location
            tmp_file_loc = f'/tmp/{fileName}'
            file.save(tmp_file_loc)
            print(f"File saved successfully in temp loc: {tmp_file_loc}")

            try:
                bucket, msg = cls.createBucketIfNotExists(user_uid)
                if not bucket:
                    print(msg)
                    raise Exception

                # Get file from bucket
                blob = bucket.blob(f"{fileType}/{fileName}")
                if not blob.exists():
                    blob.upload_from_filename(tmp_file_loc)
                    blob.make_public()
                    msg = f"Successfully uploaded {user_uid}/{fileType}"
                    print(msg)
                else:
                    msg = f"File: {fileType}/{fileName} already exists"

                public_url = blob.public_url
                os.remove(tmp_file_loc)

                return public_url, msg
            except Exception:
                    os.remove(tmp_file_loc)
                    print(traceback.format_exc())
                    return False, f"Unable to upload {user_uid}/{fileType}!"
            
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to upload {fileType} to {user_uid}'s storage!"


    @classmethod
    def uploadMultipleFiles(cls, user_uid, files, fileType="resume"):
        try: 
            print(f"Uploading multiples {fileType}, user: {user_uid}")

            fileNames = []
            tmp_file_locs = []

            try:
                for file in files:
                    fileName = file.filename
                    fileNames.append(fileName)

                    file_loc = f'/tmp/{fileName}'
                    tmp_file_locs.append(file_loc)

                    file.save(file_loc)
            except Exception:
                print(traceback.format_exc())
                for file in tmp_file_locs: os.remove(file)
                return False, "Unable to save files"

            print(f"Files saved successfully in temp loc: {tmp_file_locs}")

            try:
                bucket, msg = cls.createBucketIfNotExists(user_uid)
                if not bucket:
                    print(msg)
                    raise Exception
                

                results = TRANSFR_MGR.upload_many_from_filenames(
                    bucket, fileNames, source_directory='/tmp/', max_workers=8
                )

                urls = []

                for name, result in zip(fileNames, results):
                    # The results list is either `None` or an exception for each filename in
                    # the input list, in order.

                    if isinstance(result, Exception):
                        print("Failed to upload {} due to exception: {}".format(name, result))
                        urls.append(None)
                        continue

                    print("Uploaded {} to {}.".format(name, bucket.name))
                    blob = bucket.blob(f"{name}")
                    if blob.exists():
                        blob.make_public()
                        public_url = blob.public_url
                        print(f"url for {name}: {public_url}")
                        urls.append(public_url)


                for file in tmp_file_locs: os.remove(file)

                return urls, "Files uploaded successfully!" 
            except Exception:
                    for file in tmp_file_locs: os.remove(file)
                    print(traceback.format_exc())
                    return False, f"Unable to upload multiple files {user_uid}/{fileType}!"
            
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to upload {fileType} to {user_uid}'s storage!"


    @classmethod
    def deleteBucket(cls, user_uid):
        try:
            bucket, msg = cls.get_bucket(user_uid)
            if not bucket:
                return True, msg
            
            bucket.delete()
            return True, f"Bucket {user_uid} deleted"
        except Exception:
            print(traceback.format_exc())
            return False, f"Unable to delete bucket for user: {user_uid}!"

