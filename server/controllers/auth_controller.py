from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, set_access_cookies, unset_jwt_cookies
from flask import request, make_response, jsonify
from flask_restful import Resource
from server.models import User, Business
from server.config import db

class Login(Resource):
    def post(self):
        data = request.get_json()
        if data.get('slug'):
            business = Business.query.filter_by(slug=data['slug']).first()

            if business and business.authenticate(data['password']):
                token = create_access_token(identity=business.to_dict())
                response = make_response(business.to_dict(), 200)
                set_access_cookies(response, token)
                return response

            return {'error': 'Incorrect login details'}, 401
        
        user = User.query.filter_by(email=data.get('email')).first()

        if user and user.authenticate(data.get('password')):
            token = create_access_token(identity=user.to_dict(), expires_delta=False)
            response = make_response(user.to_dict(), 200)
            set_access_cookies(response, token)
            return response
        
        return {'error': 'Incorrect login details'}, 401
    
class Register(Resource):
    def post(self):
        data = request.get_json()
        print(data)
        if data.get('slug'):
            
            business = Business(slug=data.get('slug'))
            
            business.password_hash = data.get('password')

            db.session.add(business)
            db.session.commit()

            return make_response(business.to_dict(), 201)
        
        user = User(email=data.get('email'))
        user.password_hash = data.get('password')
        
        db.session.add(user)
        db.session.commit()

        return make_response(user.to_dict(), 201)
    
    @jwt_required(locations=['cookies'])
    def patch(self):
        data = request.get_json() 

        if data.get('slug'):
            business = Business.query.filter_by(slug=data.get('slug')).first()
            
            for attr in data:
                setattr(business, attr, data[attr])

            db.session.add(business)
            db.session.commit()

            return make_response(business.to_dict(), 201)
        
        user = get_jwt_identity()
        user = User.query.filter_by(id=user.get('id')).first()
        print(user)
        for attr in data:
            setattr(user, attr, data[attr])

        db.session.add(user)
        db.session.commit()

        return make_response(user.to_dict(), 201)

class UserProfile(Resource):
    @jwt_required(locations=['cookies'])
    def get(self):
        user = get_jwt_identity()
        user = User.query.filter_by(id=user.get('id')).first()
        
        if not user:
            return make_response(jsonify({"message": "User not found"}), 404)

        return make_response(jsonify(user.to_dict()), 200)

class Logout(Resource):
    @jwt_required(locations=['cookies'])
    def post(self):
        print("Logging out user")
        response = make_response(jsonify({}), 204)
        unset_jwt_cookies(response)
        return response
 