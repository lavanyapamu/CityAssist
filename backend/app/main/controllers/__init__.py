from flask import Blueprint
from flask_restx import Api
from app.main.controllers.user import api as user_ns
from app.main.controllers.cases import api as cases_ns  # make sure this is the simplified user_ns

blueprint = Blueprint("api", __name__)

api = Api(
    blueprint,
    title="SkillConnect API",
    version="1.0",
    description="SkillConnect Backend API"
)

api.add_namespace(user_ns, path="/users")
api.add_namespace(cases_ns,path="/case")
