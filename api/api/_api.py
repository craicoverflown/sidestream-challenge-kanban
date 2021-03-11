"""Module to setup fastapi API to expose API to the outside world."""
import random
from typing import Any, Dict, Optional

from fastapi import FastAPI, Query
import uvicorn

from .utils.logger import LOGGER
from .utils.intersection import intersect_error_lists
from .utils.request_stats import track_request_error_count

ERROR_CODES = [error_code for error_code in range(50)]
app = FastAPI()


def _generate_lists() -> Dict[str, Any]:
    """Generate resolved, unresolved and backlog lists."""
    return {
        'resolved': [{
            'index': error_idx,
            'code': random.choice(ERROR_CODES),
            'text': 'Error ABC occured, that is `resolved`'
        } for error_idx in range(50)],
        'unresolved': [{
            'index': error_idx,
            'code': random.choice(ERROR_CODES),
            'text': 'Error DEF occured, that is `unresolved`'
        } for error_idx in range(50, 100)],
        'backlog': [{
            'index': error_idx,
            'code': random.choice(ERROR_CODES),
            'text': 'Error XYZ occured, that is in the `backlog`'
        } for error_idx in range(100, 150)]
    }


@app.get("/get_lists")
@track_request_error_count
def get_lists(name: Optional[str] = Query(None)) -> Dict[str, Any]:
    """Return resolved, unresolved and backlog lists."""
    LOGGER.info('Generating resolved, unresolved and backlog lists.')
    return _generate_lists()


@app.get("/get_list_intersection_counts")
def get_list_intersection_counts() -> Dict[str, int]:
    """Return the error intersection counts between a set of resolved, unresolved and backlog lists."""
    LOGGER.info('Generating the intersection counts between a set of resolved, unresolved and backlog lists.')

    error_lists = _generate_lists()
    resolved, unresolved, backlog = error_lists['resolved'], error_lists['unresolved'], error_lists['backlog']

    return  {
        'resolved_unresolved': len(intersect_error_lists(resolved, unresolved)),
        'resolved_backlog': len(intersect_error_lists(resolved, backlog)),
        'unresolved_backlog': len(intersect_error_lists(unresolved, backlog))
    }

def run(host: str, port: int) -> None:
    """Run the code challenge API."""
    uvicorn.run(app, host=host, port=port)
