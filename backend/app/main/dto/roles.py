from flask_restx import Namespace

class RoleDTO:
    api = Namespace("role", description="Role operations")

role_ns = RoleDTO.api
