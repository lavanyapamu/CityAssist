import os
from extensions import db, bcrypt
from app.main.models.user import User
from app.main.models.roles import Role
from flask_jwt_extended import create_access_token
from datetime import timedelta
from werkzeug.utils import secure_filename



UPLOAD_FOLDER = '/home/lavanya/Desktop/CityAssist/backend/static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
def register_user(data):
    try:
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return {"message": "User already exists"}, 409

        name = data.get('role', '').lower()
        role = Role.query.filter_by(name=name).first()
        if not role:
            return {"message": "Invalid role"}, 400

        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

        new_user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=hashed_password,
            phone_number=data['phone_number'],
            colony=data.get('colony'),
            city=data['city'],
            state=data['state'],
            postal_code=data['postal_code'],
            role_id=role.role_id,
            is_verified=True
        )

        db.session.add(new_user)
        db.session.commit()
        print("User added to DB:", new_user.email)

        return new_user.to_dict() 

    except Exception as e:
        db.session.rollback()
        return {"message": f"Registration failed: {str(e)}"}, 500



def login_user(data):
    user = User.query.filter_by(email=data.get('email')).first()
    if not user:
        return {"message": "User not found"}, 404
    if not bcrypt.check_password_hash(user.password, data.get('password')):
        return {"message": "Invalid credentials"}, 401

    token = create_access_token(
        identity={'user_id': str(user.user_id), 'role_id': user.role_id, 'role': user.role.name.lower()},
        expires_delta=timedelta(days=30)
    )
    return token, user


def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if not user:
        return {"message": "User not found"}, 404
    return user.to_dict(), 200

def update_user(user_id, data, files=None):
    user = User.query.get(user_id)
    if not user:
        return {"message": "User not found"}, 404

    # Update basic fields
    user.first_name = data.get("first_name", user.first_name)
    user.last_name = data.get("last_name", user.last_name)
    user.email = data.get("email", user.email)
    user.phone_number = data.get("phone_number", user.phone_number)
    user.colony = data.get("colony", user.colony)
    user.city = data.get("city", user.city)
    user.state = data.get("state", user.state)
    user.postal_code = data.get("postal_code", user.postal_code)

    # ✅ Handle profile picture upload
    if files and 'photo' in files:
        photo_file = files['photo']
        if photo_file.filename != '':
            filename = secure_filename(photo_file.filename)
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            photo_file.save(file_path)
            user.photo = filename

    db.session.commit()
    return user.to_dict(), 200
