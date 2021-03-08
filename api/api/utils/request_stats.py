"""Module for tracking the number of requests for some APIs."""
import logging

LOGGER = logging.getLogger("API")
request_error_count = 0

def track_request_error_count(func):
    """Returns the decorated function for tracking the count of request for the error API."""
    def wrapper():
        """Returns function after counting and logging the number of requests."""
        global request_error_count
        request_error_count += 1
        LOGGER.info('Total requests for errors: %s', request_error_count)
        return func()

    return wrapper
