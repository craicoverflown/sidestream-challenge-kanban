from typing import Any, Dict, Set

def get_error_codes_as_sets(func):
    """Executes the decorated function alongside its transformed parameters"""
    def wrapper(*args):
        """Returns the decorated function with transformed parameters"""
        return func(*[set({error['code'] for error in error_dict}) for error_dict in args])

    return wrapper    

@get_error_codes_as_sets
def intersect_error_lists(error_list_a: Dict[str, Any], error_list_b: Dict[str, Any]) -> Set[int]:
    """Return the intersect of both error dictionary parameters"""
    return error_list_a.intersection(error_list_b)