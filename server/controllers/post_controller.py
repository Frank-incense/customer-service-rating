from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request, make_response
from flask_restful import Resource
from server.models import Post, Business
from server.config import db

class Posts(Resource):

    def get(self):
        posts = Post.query.all()

        if len(posts) > 0:
            return make_response([post.to_dict() for post in posts], 200)
        
        return make_response({'error': 'Posts not found'}, 404)

    @jwt_required()
    def post(self):
        data = request.get_json()
        business = Business.query.filter_by(slug=data.get('business')).first()

        post = Post(rating=data.get('rating'), 
                    comment=data.get('comment'), 
                    location=data.get('location'),
                    user_id=get_jwt_identity(),
                    business_id=business.id)
        
        db.session.add(post)
        db.session.commit()

        return make_response(post.to_dict(), 201)
        
class PostById(Resource):

    def get(self, id):
        post = Post.query.filter_by(id=id).first()

        if post:
            return make_response(post.to_dict(), 200)
        
        return make_response({'error':'Post not found'}, 404)

    @jwt_required()
    def patch(self, id):
        post = Post.query.filter_by(id=id).first()
        data = request.get_json()

        if post:
            for attr in data:
                setattr(post, attr, data[attr])

            return make_response(post.to_dict(), 200)
        
        return make_response({'error':'Post not found'}, 404)

    @jwt_required()
    def delete(self, id):
        post = Post.query.filter_by(id=id).first()

        if post:
            db.session.delete(post)
            db.session.commit()

        return make_response({}, 204)