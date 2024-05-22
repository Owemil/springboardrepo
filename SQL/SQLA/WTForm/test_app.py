from app import app
from unittest import TestCase
from models import db

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_adoption_test'
app.config['SQLALCHEMY_ECHO'] = False
app.config['TESTING']= True
app.config['WTF_CSRF_ENABLED'] = False

with app.app_context():
    db.drop_all()
    db.create_all()