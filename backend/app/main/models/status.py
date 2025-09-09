
from extensions import db, init_extensions


class Status(db.Model):
    __tablename__ = "status"

    id = db.Column(db.SmallInteger, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

    cases = db.relationship("Case", back_populates="status", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
        }

    def __repr__(self):
        return f"<Status {self.id} - {self.name}>"
