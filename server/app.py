from flask import Flask, send_from_directory
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from dotenv import load_dotenv
from flask_cors import CORS
from server.config import db 
from server.models import User, Post, Business, Category
from server.controllers import addResource
import os

load_dotenv()

app = Flask(__name__, static_folder="../client/dist", static_url_path="/")
CORS(app, supports_credentials=True)
app.config.from_prefixed_env(prefix='FLASK')
db.init_app(app=app)
migrate = Migrate(app=app, db=db)
bcrypt = Bcrypt(app=app)
jwt = JWTManager(app=app)
api = Api(app=app)
addResource(api)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_vue(path):  # Vite/React/Vue—all work the same
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
