from importlib.metadata import files
import os
from app.main.models.cases import Case
from app.main.models.categories import Category
from app.main.models.status import Status
from extensions import db
from werkzeug.utils import secure_filename



UPLOAD_FOLDER = '/home/lavanya/Downloads/Lavanya_CityAssist/Cityassist/CityAssist/backend/static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
def add_case(data, files):
    pending_status = Status.query.filter_by(name="Pending").first()
    photo_file = files.get('photo')
    photo = None
    if photo_file:
        filename = secure_filename(photo_file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        photo_file.save(file_path)
        photo = filename  
    case = Case(
        title=data["title"],
        description=data["description"],
        user_id=data["user_id"],
        category_id=data["category_id"],
        status_id=pending_status.id,
        photo=photo 
    )
    db.session.add(case)
    db.session.commit()
    return case.to_dict()

def update_case(case_id, data, files=None):
    case = Case.query.get(case_id)
    if not case:
        return {"message": "Case not found"}, 404

   
    case.title = data.get("title", case.title)
    case.description = data.get("description", case.description)
    case.category_id = data.get("category_id", case.category_id)
    case.status_id = data.get("status_id", case.status_id)
    case.location = data.get("location", case.location)

    
    if files and 'photo' in files:
        photo_file = files['photo']
        if photo_file.filename != '':
            from werkzeug.utils import secure_filename
            import os

            filename = secure_filename(photo_file.filename)
            UPLOAD_FOLDER = '/home/lavanya/Desktop/CityAssist/backend/static/uploads'
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            photo_file.save(file_path)
            case.photo = filename  

    db.session.commit()
    return case.to_dict()


def delete_case(case_id):
    case = Case.query.get(case_id)
    if not case:
        return {"message": "Case not found"}, 404

    db.session.delete(case)
    db.session.commit()
    return {"message": "Case deleted successfully"}


def get_all_categories():
    from app.main.models.categories import Category  
    categories = Category.query.all()
    return [c.to_dict() for c in categories]

def get_user_cases(user_id):
    cases = Case.query.filter_by(user_id=user_id).order_by(Case.created_at.desc()).all()
    return [case.to_dict() for case in cases]


def get_case_by_id(case_id):
    case = Case.query.get(case_id)
    if not case:
        return {"message": "Case not found"}, 404
    return case.to_dict()


def get_all_cases():
    """Fetch all cases from all users"""
    cases = Case.query.order_by(Case.created_at.desc()).all()
    return [case.to_dict() for case in cases]


def get_all_statuses():
    from app.main.models.status import Status
    statuses = Status.query.all()
    return [s.to_dict() for s in statuses]

def update_case_status(case_id, new_status_id):
    from app.main.models.cases import Case
    case = Case.query.get(case_id)
    if not case:
        return {"message": "Case not found"}, 404
    case.status_id = new_status_id
    from extensions import db
    db.session.commit()
    return case.to_dict()
