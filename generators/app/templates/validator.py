from flask_inputs import Inputs
from wtforms import validators

#api token validation on headers
class ApiTokenInput(Inputs):
    headers = {
        'X-Request-Token': [
            validators.DataRequired(message="Token field is required")
        ]
    }

class <%= model %>Inputs(Inputs):
    form = {
        <%- createValidatorFields(fields) %>
    }
