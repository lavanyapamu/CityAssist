from datetime import datetime

from extensions import db, init_extensions


class User(db.Model):
    __tablename__ = "users"

    user_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    colony = db.Column(db.String(100))
    city = db.Column(db.String(80), nullable=False)
    state = db.Column(db.String(20), nullable=False)
    postal_code = db.Column(db.String(10), nullable=False)
    role_id = db.Column(db.SmallInteger, db.ForeignKey("roles.role_id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_verified = db.Column(db.Boolean, default=False)
    photo = db.Column(db.String(255), nullable=True)


    role = db.relationship("Role", back_populates="users")
    cases = db.relationship("Case", back_populates="user", lazy=True, cascade="all, delete")

    def __repr__(self):
        return f"<User {self.user_id} - {self.email}>"
    def to_dict(self):
        return {
            "user_id": self.user_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone_number": self.phone_number,
            "colony": self.colony,
            "city": self.city,
            "state": self.state,
            "postal_code": self.postal_code,
            "role": self.role.name if self.role else None,
            "is_verified": self.is_verified,
            "photo": self.photo ,
            "created_at": self.created_at.isoformat()
        }