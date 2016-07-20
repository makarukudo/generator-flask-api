from flask_inputs import Inputs
from wtforms import validators

#api token validation on headers
class ApiTokenInput(Inputs):
    headers = {
        'X-Request-Token': [
            validators.DataRequired(message="Token field is required")
        ]
    }

class <%= name_upper %>Inputs(Inputs):
    form = {
        'name': [
            validators.DataRequired(message="Email field is required"),
#            validators.Email(message="Please enter a valid email"),
            validators.Length(max=160)
            ]
    }
