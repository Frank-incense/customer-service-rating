from flask import Flask
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from dotenv import load_dotenv
from flask_cors import CORS
from server.config import db 
from server.models import User, Post, Business
from server.controllers import addResource

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config.from_prefixed_env(prefix='FLASK')
db.init_app(app=app)
migrate = Migrate(app=app, db=db)
bcrypt = Bcrypt(app=app)
jwt = JWTManager(app=app)
api = Api(app=app)
addResource(api)
