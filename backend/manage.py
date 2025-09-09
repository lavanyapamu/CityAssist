from flask import Flask
from app.main.config.dev_config import Config
from extensions import init_extensions, db
from app.main.controllers import blueprint  # registers all namespaces
from flask_cors import CORS 

def create_app():
    """
    Flask app factory function.
    """
    app = Flask(__name__)
    app.config.from_object(Config)

   
    init_extensions(app)
    CORS(app) 
    app.register_blueprint(blueprint)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
