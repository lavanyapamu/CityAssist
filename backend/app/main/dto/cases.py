from flask_restx import Namespace

class CaseDTO:
    api = Namespace("case", description="Case operations")

case_ns = CaseDTO.api
