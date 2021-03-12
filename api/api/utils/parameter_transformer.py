"""Module for provisioning decorators that perform type conversion on function parameters."""
from functools import wraps

def input_models_as_dictionaries(func):
    """Return the decorated function with the transformed paramerters."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        """Return function with type conversion of kwargs from List[BaseModel] to List[Dict] as parameter."""
        return func([*map(lambda model: model.dict(), list(*kwargs.values()))])

    return wrapper

def get_error_codes_as_sets(func):
    """Return the decorated function with transformed parameters."""
    @wraps(func)
    def wrapper(*args):
        """Return the function with type conversion of error['code'] from List[int] to Set[int] as parameter."""
        return func(*[set({error['code'] for error in error_dict}) for error_dict in args])

    return wrapper   