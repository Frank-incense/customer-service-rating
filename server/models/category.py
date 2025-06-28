from server.config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import validates, relationship

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    id = Column(Integer(), primary_key=True)
    category = Column(String(), nullable=False)

    businesses = relationship('Business', back_populates='category')

    serialize_rules = ('-businesses.category',)

    def __repr__(self):
        return f"Category: {self.id}, {self.category}"
    
    @validates('category')
    def validates_category(self, key, value):
        categories = ['Banking and Financial Services',
                        'Food & Beverage',
                        'Retail & Shops',
                        'Health & Wellness',
                        'Telecommunication',
                        'Transport and logistics',
                        'Hotel & Hospitality']
        if value in categories:
            return value
        raise ValueError(f'Ensure category is either {" or ".join(categories)}.')