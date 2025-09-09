from flask_restx import Namespace

class StatusDTO:
    api = Namespace("status", description="Case status operations")

status_ns = StatusDTO.api
