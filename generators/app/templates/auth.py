from Flask import request
from functools import wraps

def check_api(f):
  @wraps(f)
  def validate_api():
    token = request.headers.get('X-Request-Token', None)
    if token is None:
      
    else:
