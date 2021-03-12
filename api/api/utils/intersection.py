"""Module for intersecting data collections."""
from typing import Any, Dict, Set

from .parameter_transformer import get_error_codes_as_sets

@get_error_codes_as_sets
def intersect_error_lists(error_list_a: Dict[str, Any], error_list_b: Dict[str, Any]) -> Set[int]:
    """Return the intersect of both error dictionary parameters."""
    return error_list_a.intersection(error_list_b)