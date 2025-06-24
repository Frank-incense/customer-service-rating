from server.config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, Float, DateTime, func, ForeignKey
from sqlalchemy.orm import validates, relationship
# from sqlalchemy.ext.hybrid import hybrid_property

class Post(db.Model, SerializerMixin):

    __tablename__ = 'posts'

    id = Column(Integer(), primary_key=True)
    rating = Column(Float(), nullable=False)
    comment = Column(String(), nullable=False)
    location = Column(Integer(), nullable=False)
    user_id = Column(Integer(), ForeignKey('users.id', ondelete='CASCADE'))
    business_id = Column(Integer(), ForeignKey('businesses.id', ondelete='CASCADE'))
    createdAt = Column(DateTime(), server_default=func.now())
    updatedAt = Column(DateTime(), onupdate=func.now())

    user = relationship('User', back_populates='posts')
    business = relationship('Business', back_populates='posts')

    def __repr__(self):
        return f'Post: {self.id}, {self.rating}'
    
    @validates('rating')
    def validates_rating(self, key, value):
        if 1 <= value <=5:
            return value
        raise ValueError('Rating should be a number between 1 and 5 inclusive.')
    
    @validates('location')
    def validate_location(self, key, value):
        if isinstance(value, str)and not value.isspace():
            return value
        raise ValueError('Location should not be an empty string.')
    
    @validates('comment')
    def validate_location(self, key, value):
        if isinstance(value, str)and not value.isspace():
            return value
        raise ValueError('Comment should not be an empty string.')
