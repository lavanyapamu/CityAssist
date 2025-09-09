from app.main.utils.defaultdata import seed_default_data
from manage import create_app
from extensions import init_extensions, db

app = create_app()

with app.app_context():
    db.create_all()
    seed_default_data()
    print("Database tables created successfully.")

if __name__ == "__main__":
    app.run(debug=True)
