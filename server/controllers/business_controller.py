from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request, make_response, jsonify
from flask_restful import Resource
from server.models import User, Business, Category
from server.config import db

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
        
        db.session.add(business)
        db.session.commit()

        return make_response(jsonify(business.to_dict()), 200)

class BusinessById(Resource):
    
    def get(self, id):
        business = Business.query.get(id)
        
        if not business:
            return make_response(jsonify({"message": "Business not found"}), 404)

        biz = {
            "id": business.id,
            "slug": business.slug,
            "email": business.email,
            "logo_url": business.logo_url,
            "locations": business.locations,
            "category_id": business.category_id,
            "createdAt": business.createdAt,
            "updatedAt": business.updatedAt,
            "posts": [post.to_dict() for post in business.posts],
            "category": business.category.category if business.category else None,
            "total_reviews": len(business.posts),
            "average_rating": (
                sum(post.rating for post in business.posts) / len(business.posts)
                if business.posts else 0
            )
        }
        return make_response(jsonify(biz), 200)

    @jwt_required(locations=['cookies'])
    def patch(self, id):
        data = request.get_json()
        
        business = Business.query.filter_by(id=id).first()
        cat = Category.query.filter_by(category=data.get('category')).first()
        
        print(business)
        if not business:
            return make_response(jsonify({"message": "Business not found"}), 404)

        business.name = data.get('name')
        business.locations = data.get('locations')
        business.category_id = cat.id if cat else None

        db.session.add(business)
        db.session.commit()

        return make_response(jsonify(business.to_dict()), 200)

    @jwt_required()
    def delete(self, id):
        business = Business.query.filter_by(id=id).first()
        
        if not business:
            return make_response(jsonify({"message": "Business not found"}), 404)

        business.delete()

        return make_response(jsonify({"message": "Business deleted successfully"}), 200)