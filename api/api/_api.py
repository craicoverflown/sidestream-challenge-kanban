"""Module to setup fastapi API to expose API to the outside world."""
import random
from typing import Dict, List, Optional

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from .utils.logger import LOGGER
from .utils.intersection import intersect_error_lists
from .utils.request_stats import track_request_error_count
from .utils.data_processor import count_error_code_occurrences
from .utils.parameter_transformer import input_models_as_dictionaries

from .models.error import Error

ERROR_CODES = [error_code for error_code in range(50)]
app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

def _generate_lists() -> Dict[str, Error]:
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
def get_lists(name: Optional[str] = Query(None)) -> Dict[str, Error]:
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

@app.post("/count_resolved_error_code_occurrences")
@input_models_as_dictionaries
def count_resolved_error_code_occurrences(resolved_errors: List[Error]) -> List[Dict[str, int]]:
    """Return the number of occurrences for each resolved error code."""
    LOGGER.info('Generating the occurrence counts for each resolved error code.')

    return count_error_code_occurrences(resolved_errors)

def run(host: str, port: int) -> None:
    """Run the code challenge API."""
    uvicorn.run(app, host=host, port=port)
