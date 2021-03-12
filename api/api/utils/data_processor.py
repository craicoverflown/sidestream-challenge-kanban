"""Module for undertaking data transformation operations."""
from typing import List, Dict

import pandas as pd
import numpy as np

def count_error_code_occurrences(errors: List[Dict[str, int]]) -> List[Dict[str, int]]:
    """Return the number of occurrences for each distinct error code."""

    # Load the errors into a new DataFrame
    df_errors = pd.DataFrame(errors)

    # Extract the 'code' column as a numpy array
    np_error_codes = df_errors['code'].values

    # Get the number of occurrences for each distinct error code
    codes, occurrences = np.unique(np_error_codes, return_counts=True)

    # Load the evaluated data into a new DataFrame with column names
    code_occurrences = list(zip(codes.tolist(), occurrences.tolist()))
    df_code_occurrences = pd.DataFrame(data=code_occurrences, columns=["code","occurrence"])

    # Return the evaluated data as List[Dict]
    return df_code_occurrences.to_dict('records')
