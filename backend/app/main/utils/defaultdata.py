import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))



def seed_default_data():
  
    from app.main.models.roles import Role
    from app.main.models.status import Status
    from app.main.models.categories import Category
    # roles.py
    from extensions import db, init_extensions

    # --- Roles (only one for now) ---
    if not Role.query.filter_by(name="Citizen").first():
        db.session.add(Role(name="Citizen"))

    # --- Case Statuses ---
    case_statuses = ["Pending", "In Progress", "Resolved", "Closed"]
    for s in case_statuses:
        if not Status.query.filter_by(name=s).first():
            db.session.add(Status(name=s))

    # --- Categories ---
    categories = {
        "Electricity": "Issues related to electricity supply, power cuts, or faulty poles.",
        "Water Supply": "Problems regarding water shortage, leakage, or contamination.",
        "Roads": "Complaints about potholes, road damage, or poor maintenance.",
        "Sanitation": "Garbage collection, drainage issues, or cleanliness concerns."
    }
    for name, description in categories.items():
        if not Category.query.filter_by(name=name).first():
            db.session.add(Category(name=name, description=description))

    db.session.commit()
    print(" Default role, statuses, and categories inserted successfully!")
