"""Module for tracking the number of requests for some APIs."""
from collections import defaultdict
from functools import wraps

from .logger import LOGGER

# Set default value to 0 for any key
request_error_count_per_user = defaultdict(lambda: 0, {})

def track_request_error_count(func):
    """Return the decorated function for tracking the count of requests for the error API."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        """Return function after counting and logging the number of requests."""
        global request_error_count_per_user
        name = kwargs['name']
        request_error_count_per_user[name] += 1

        LOGGER.info('(%s) Total requests for errors: %d', name, request_error_count_per_user[name])
        return func(*args, **kwargs)

    return wrapper
