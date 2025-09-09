
from extensions import db, init_extensions



class Role(db.Model):
    __tablename__ = "roles"

    role_id = db.Column(db.SmallInteger, primary_key=True, autoincrement=True)
    name = db.Column(db.String(30), nullable=False, unique=True)

    users = db.relationship("User", back_populates="role", lazy=True)

    def to_dict(self):
        return {
            "role_id": self.role_id,
            "name": self.name,
        }

    def __repr__(self):
        return f"<Role {self.role_id} - {self.name}>"
