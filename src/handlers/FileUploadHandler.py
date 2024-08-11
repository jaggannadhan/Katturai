from flask import Blueprint, request, jsonify
from src.services.DecoratorService import login_required_strict
from src.services.FileUploadService import FileUploadService

fileuploader = Blueprint("fileuploader", __name__)

@fileuploader.route("/<user_uid>/uploadProfilePic", methods=["POST"])
@login_required_strict
def uploadProfilePic(user_uid):
    file = request.files.get('profilePic')
    if not file:
        return jsonify({'error': 'Image is required'}), 400

    url, msg = FileUploadService.uploadFile(user_uid, file, fileType="profilePic")
    return jsonify({
        "success": True if url else False,
        'url': url,
        'msg': msg
    })


@fileuploader.route("/<user_uid>/uploadResume", methods=["POST"])
@login_required_strict
def uploadResume(user_uid):
    file = request.files.get('resume')
    if not file:
        return jsonify({'error': 'No file name resume'}), 400

    url, msg = FileUploadService.uploadFile(user_uid, file, fileType="resume")
    return jsonify({
        "success": True if url else False,
        'url': url,
        'msg': msg
    })

@fileuploader.route("/<user_uid>/uploadMultipleFiles", methods=["POST"])
@login_required_strict
def uploadMultipleFiles(user_uid):
    files = request.files.getlist('recentWork')
    if not files:
        return jsonify({'error': 'Unable to get files'}), 400

    urls, msg = FileUploadService.uploadMultipleFiles(user_uid, files, fileType="work")
    return jsonify({
        "success": True if urls else False,
        'urls': urls,
        'msg': msg
    })