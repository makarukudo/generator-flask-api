from flask import Blueprint, request, jsonify, redirect
from lib.<%= folder %>.models.<%= name %>s import <%= name_upper %>

<%= name %>_api = Blueprint('<%= name %>_api', __name__, url_prefix='/api')

# Create user profile
@<%= name %>_api.route('/<%= name %>s', methods=['GET', 'POST'])
def <%= name %>s():
    return jsonify(status=True)


# Get user profile
@<%= name %>_api.route('/<%= name %>/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def <%= name %>(id):
    return jsonify(status=True)


# Default Route
@<%= name %>_api.route('/', methods=['GET'])
def index():
    return jsonify(status=True)
