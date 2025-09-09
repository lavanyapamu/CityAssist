# app/main/dto/user_dto.py
from flask_restx import Namespace

class UserDTO:
    api = Namespace("user", description="User operations")

user_ns = UserDTO.api
