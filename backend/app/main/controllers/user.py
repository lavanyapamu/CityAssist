from flask import request, jsonify
from flask_restx import Namespace, Resource
from app.main.services.user import register_user, login_user
from app.main.dto.user import user_ns

api = user_ns

@api.route('/register')
class RegisterUser(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return {"message": "No input data received"}, 400

        result = register_user(data)

        if isinstance(result, tuple):  
            return result
        else:
            return {"message": "Registration successful", "user_id": result["user_id"]}, 201



@api.route("/login")
class LoginUser(Resource):
    def post(self):
        data = request.get_json()
        result = login_user(data)
        if isinstance(result, tuple):
            token, user = result
            return {
                "access_token": token,
                "user_id": user.user_id,
                "role": user.role.name
            }, 200
        return result  
