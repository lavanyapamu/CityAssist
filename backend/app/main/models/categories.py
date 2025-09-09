
from extensions import db, init_extensions


class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.SmallInteger, primary_key=True, autoincrement=True)
    name = db.Column(db.String(30), nullable=False, unique=True)
    description = db.Column(db.String(200))

    cases = db.relationship("Case", back_populates="category", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
        }

    def __repr__(self):
        return f"<Category {self.id} - {self.name}>"
