import os
from dotenv import load_dotenv


load_dotenv()

user=os.getenv('DB_USER')
password=os.getenv('DB_PASSWORD')
host=os.getenv('DB_HOST')
port=os.getenv('DB_PORT')
db_name=os.getenv('DB_NAME')

class Config:
    SQLALCHEMY_DATABASE_URI=f"postgresql://{user}:{password}@{host}:{port}/{db_name}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS={
        "connect_args":{
            "options":"-c search_path=cityassist"
        }
    }


    SECRET_KEY = os.getenv("SECRET_KEY")

    MAIL_SERVER = os.getenv("MAIL_SERVER")
    MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS", "True") == "True"
    MAIL_USE_SSL = os.getenv("MAIL_USE_SSL", "False") == "True"
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER")

    
    FRONTEND_URL = os.getenv("FRONTEND_URL")
    
