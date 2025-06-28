from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request, make_response, jsonify
from flask_restful import Resource
from server.models import Post, User, Business

class Dashboard(Resource):

    @jwt_required()
    def get(self):
        pass

class BusinessController(Resource):

    def get(self):
    
        business = Business.query.all()
        if not len(business):
            return make_response(jsonify({"message": "Business not found"}), 404)

        return make_response(jsonify([b.to_dict() for b in business]), 200)
    
    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return make_response(jsonify({"message": "User not found"}), 404)

        new_business = Business(name=data['name'], user_id=user.id)
        new_business.save()

        return make_response(jsonify(new_business.to_dict()), 201)
    
class BusinessDetail(Resource):
    
    def get(self, slug):
        business = Business.query.filter_by(slug=slug).first()
        
        if not business:
            return make_response(jsonify({"message": "Business not found"}), 404)

        print(business)
        return make_response(jsonify(business.to_dict()), 200)

    @jwt_required()
    def patch(self, slug):
        data = request.get_json()
        business = Business.query.filter_by(slug=slug).first()
        if not business:
            return make_response(jsonify({"message": "Business not found"}), 404)

        for key, value in data.items():
            setattr(business, key, value)
        
        business.save()

        return make_response(jsonify(business.to_dict()), 200)