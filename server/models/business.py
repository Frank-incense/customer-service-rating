from server.config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime,func
from sqlalchemy.orm import validates, relationship
from sqlalchemy.ext.hybrid import hybrid_property

class Business(db.Model, SerializerMixin):
    __tablename__ = 'businesses'

    id = Column(Integer(), primary_key=True)
    slug = Column(String(), nullable=False)
    email = Column(String())
    logo_url = Column(String())
    locations = Column(String())
    _password_hash = Column(String())
    createdAt = Column(DateTime(), server_default=func.now())
    updatedAt = Column(DateTime(), onupdate=func.now())

    posts = relationship('Post', back_populates='business')

    serialize_rules = ('-posts.business',)

    def __repr__(self):
        return f'Business: {self.id}, {self.slug}'
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Cannot access this attribute')
    
    @password_hash.setter
    def password_hash(self, value):
        from server.app import bcrypt
        password_hash = bcrypt.generate_password_hash(value.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        from server.app import bcrypt
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))