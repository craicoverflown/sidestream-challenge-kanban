import os
import logging

path = "./api/__temp__"
file = '{}/api.log'.format(path)

try:
    os.mkdir(path)
except OSError:
    print("Creation of directory {} failed".format(path))

logging.basicConfig(format='[%(asctime)s] %(message)s', level=logging.INFO, filename=file)
LOGGER = logging.getLogger("API")