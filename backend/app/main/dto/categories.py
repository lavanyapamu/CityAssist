from flask_restx import Namespace

class CategoryDTO:
    api = Namespace("category", description="Category operations")

category_ns = CategoryDTO.api
