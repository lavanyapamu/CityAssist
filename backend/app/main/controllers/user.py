from flask import request, jsonify
from flask_restx import Namespace, Resource
from app.main.services.user import get_user_by_id, register_user, login_user, update_user
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

@api.route('/<int:user_id>')
class UserProfile(Resource):
    def get(self, user_id):
        """Fetch user profile by ID"""
        return get_user_by_id(user_id)
    def put(self, user_id):
        """Update user profile with optional photo"""
        data = request.form.to_dict()
        files = request.files  # ✅ pass dict instead of single file
        return update_user(user_id, data, files)
