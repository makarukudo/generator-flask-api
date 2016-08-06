from lib import db
from flask import Blueprint, request, jsonify, redirect
from flask_cors import CORS, cross_origin
from lib.core.models.<%= name.plural %>_model import <%= model %>
from lib.<%= folder %>.validators.<%= name.plural %>_validator import <%= model %>Inputs

<%= name.singular %>_api = Blueprint('<%= name.singular %>_api', __name__, url_prefix='/api')
cors = CORS(<%= name.singular %>_api, resources={r'/api/*': {'origins': '*'}})

@<%= name.singular %>_api.route('/<%= name.plural %>', methods=['GET', 'POST'])
def <%= name.plural %>():
    if request.method == 'GET':
      <%= name.plural %> = <%= model %>.all()
      return jsonify(status=True, data=[<%= model %>.serialize(<%= name.singular %>) for <%= name.singular %> in <%= name.plural %>])

    else:
      inputs = <%= model %>Inputs(request)
      if inputs.validate():
        <%= name.singular %> = <%= model %>.get_or_create(<%- createFormFields(fields).join(", ") %>)
        return jsonify(status=True, data=<%= model %>.serialize(<%= name.singular %>))

      else:
        return jsonify(status=False, errors=inputs.errors)


@<%= name.singular %>_api.route('/<%= name.singular %>/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def <%= name.singular %>(id):
    if request.method == 'PUT':
      inputs = <%= model %>Inputs(request)
      if inputs.validate():
        <%= name.singular %> = <%= model %>.get_or_notfound(id)
        <%- createFormFields(fields, name.singular).join("\n\t\t\t") %>
        <%= name.singular %>.save()
        return jsonify(status=True, message='Updated Successfully')

      else:
        return jsonify(status=False, errors=inputs.errors)

    elif request.method == 'DELETE':
      <%= name.singular %> = <%= model %>.get_or_notfound(id)
      <%= name.singular %>.delete()
      return jsonify(status=True, message='Deleted Successfully')

    else:
      <%= name.singular %> = <%= model %>.get_or_notfound(id)
      return jsonify(status=True, data=<%= model %>.serialize(<%= name.singular %>))
