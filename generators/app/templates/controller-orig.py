from lib import db
from flask import Blueprint, request, jsonify, redirect
from flask_cors import CORS, cross_origin
from lib.<%= folder %>.models.<%= name.plural %>s import <%= model %>
from lib.<%= folder %>.validators.<%= name.plural %>s import <%= model %>Inputs

<%= name.singular %>_api = Blueprint('<%= name %>_api', __name__, url_prefix='/api')
cors = CORS(<%= name.singular %>_api, resources={r'/api/*': {'origins': '*'}})

@<%= name.singular %>_api.route('/<%= name.plural %>', methods=['GET', 'POST'])
def <%= name.plural %>():
    if request.method == 'GET':
      <%= name.plural %>s = <%= model %>.all()
      return jsonify(status=True, data=[<%= model %>.serialize(<%= name.singular %>) for <%= name.singular %> in <%= name.plural %>])

    else:
      inputs = <%= model %>Inputs(request)
      if inputs.validate():
        <%= name.singular %> = <%= model %>.get_or_create(<%= createForm(fields) %>)
        return jsonify(status=True, data=<%= model %>.serialize(<%= name.singular %>))

      else:
        return jsonify(status=False, errors=inputs.errors)


@<%= name.singular %>_api.route('/<%= name.singular %>/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def <%= name.singular %>(id):
    if request.method == 'GET':
      <%= name.singular %> = <%= model %>.query.get(id)
      return jsonify(status=True, data=<%= model %>.serialize(<%= name.singular %>))

    elif request.method == 'PUT':
      inputs = <%= name_upper %>Inputs(request)
      if inputs.validate():
        <%= name %> = <%= name_upper %>.query.get(id)
        <%= name %>.name = request.form['name']
        db.session.update(<%= name %>)
        db.session.commit()
        return jsonify(status=True, message='Updated Successfully')

      else:
        return jsonify(status=False, errors=inputs.errors)

    elif request.method == 'DELETE':
      <%= name %> = <%= name_upper %>.query.get(id)
      db.session.delete(<%= name %>)
      db.session.commit()
      return jsonify(status=True, message='Deleted Successfully')

    else:
      return jsonify(status=False, message='Endpoint Not Found')

<% for(var i = 0; i < relationship.length; i++) { %>
@<%= name %>_api.route('/<%= name %>s/<%= relationship[i] %>s/<int:id>', methods=['GET', 'POST'])
def <%= name %>s_<%= relationship[i] %>s(id):
    from lib.<%= folder %>.models.<%= relationship[i] %>s import <%= name_upper + relationship[i][0].toUpperCase() + relationship[i].slice(1) %>
    if request.method == 'GET':
      <%= name %> = <%= name_upper + relationship[i][0].toUpperCase() + relationship[i].slice(1) %>.query.get(id)
      return jsonify(status=True, data=<%= name_upper + relationship[i][0].toUpperCase() + relationship[i].slice(1) %>.serialize(<%= name %>))

<% } %>
