# Libs
from pathlib import Path
from flask import render_template


# Classes
class IndexController:
    @staticmethod
    def get() -> str:
        '''
            GET /
        '''
        index_path = Path("index.html")
        print(str(index_path))
        return render_template(str(index_path))
