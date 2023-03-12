# Libs
from flask import Flask
from os import environ
from pathlib import Path

from controllers.index_controller import IndexController
from controllers.ip_controller import IpController

# Data
app = Flask(
    __name__,
    static_folder=Path('public').absolute(),
    template_folder=Path('public/assets/templates').absolute()
)


# Routes
@app.route('/', methods=['GET'])
def get_index():
    return IndexController.get()


@app.route('/ip', methods=['GET'])
def get_ip():
    return IpController.get()


@app.route('/ip/all', methods=['GET'])
def get_ip_all():
    return IpController.getAll()


# Code
if (__name__ == "__main__"):
    app.run('0.0.0.0', port=environ.get("PORT"))
