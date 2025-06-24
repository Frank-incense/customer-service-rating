from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request, make_response, jsonify
from flask_restful import Resource
from server.models import Post, User, Business

class Dashboard(Resource):

    @jwt_required()
    def get(self):
        pass