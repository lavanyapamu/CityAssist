# case_controller.py
from app.main.models.cases import Case
from flask_restx import Resource
from flask import request
from app.main.dto.cases import case_ns
from app.main.services.cases import add_case, get_user_cases, update_case, delete_case, get_all_categories

api = case_ns

@api.route('/add')
class AddCase(Resource):
    
    def post(self):
        data = request.form.to_dict()  
        files = request.files          
        return add_case(data, files)

@api.route('/update/<int:case_id>')
class UpdateCase(Resource):
    def put(self, case_id):
        """
        Update a case, including optional photo upload
        """
        
        data = request.form.to_dict()  
        files = request.files

        updated_case = update_case(case_id, data, files)
        return updated_case, 200

@api.route('/delete/<int:case_id>')
class DeleteCase(Resource):
    def delete(self, case_id):
        return delete_case(case_id)

@api.route('/category/all')
class AllCategories(Resource):
    def get(self):
        return get_all_categories()

@api.route('/mycases/<int:user_id>')
class UserCases(Resource):
    def get(self, user_id):
        """
        Fetch all cases added by the given user
        """
        cases = Case.query.filter_by(user_id=user_id).all()
        return [case.to_dict() for case in cases], 200
    
@api.route('/<int:case_id>')
class SingleCase(Resource):
    def get(self, case_id):
        from app.main.services.cases import get_case_by_id
        return get_case_by_id(case_id)