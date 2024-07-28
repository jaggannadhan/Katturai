from flask import Blueprint, request, json
from flask import jsonify
from src.services.DecoratorService import login_required_strict
from src.services.FileUploadService import FileUploadService

fileupload = Blueprint("fileupload", __name__)

@fileupload("/<user_uid>/uploadFile", methods=["POST"])
@login_required_strict
def uploadFile(user_uid):
    file = request.files.get('image')
    if not file:
        return jsonify({'error': 'Image is required'}), 400,

    tmp_file = f'/tmp/{file.filename}'
    file.save(tmp_file)

    url = FileUploadService.uploadFile(user_uid, tmp_file)
    return jsonify({'url': url})
