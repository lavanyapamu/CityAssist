from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from flask_jwt_extended import JWTManager


db = SQLAlchemy()
bcrypt = Bcrypt()
mail = Mail()
jwt = JWTManager()

def init_extensions(app):
    """
    Initialize all extensions with the Flask app.
    """
    db.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)
    jwt.init_app(app)
