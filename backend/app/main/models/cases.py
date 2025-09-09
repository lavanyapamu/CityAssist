from datetime import datetime


from extensions import db, init_extensions


class Case(db.Model):
    __tablename__ = "cases"

    case_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.BigInteger, db.ForeignKey("users.user_id"), nullable=False)
    category_id = db.Column(db.SmallInteger, db.ForeignKey("categories.id"), nullable=False)
    status_id = db.Column(db.SmallInteger, db.ForeignKey("status.id"), nullable=False)
    photo = db.Column(db.String(255), nullable=True)  # image filename/path
    location = db.Column(db.String(255), nullable=True)   # address or coordinates


    user = db.relationship("User", back_populates="cases")
    category = db.relationship("Category", back_populates="cases")
    status = db.relationship("Status", back_populates="cases")

    def to_dict(self):
        UPLOAD_FOLDER_URL = 'http://127.0.0.1:5000/static/uploads/'
        return {
            "case_id": self.case_id,
            "title": self.title,
            "description": self.description,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "user_id": self.user_id,
             "name": self.user.first_name if self.user else None,  
            "category_id": self.category_id,
            "category_name": self.category.name if self.category else None,
            "status_id": self.status_id,
            "status_name": self.status.name if self.status else None,
            "photo": UPLOAD_FOLDER_URL + self.photo if self.photo else None,
            "location": self.location if self.location else "Not specified"

        }

    def __repr__(self):
        return f"<Case {self.case_id} - {self.title}>"
