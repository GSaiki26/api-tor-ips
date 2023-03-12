# Libs
import requests as r

from models.ip_model import IpModel


# Classes
class IpController:
    @staticmethod
    def get() -> list[dict[str, any]]:
        '''
            GET /ip
        '''
        try:
            ips = IpModel.getIps()
        except r.ConnectionError:
            return {
                'status': 'error',
                'message': 'Couldn\'t connect with the api.'
            }
        return ips

    @staticmethod
    def getAll() -> list[dict[str, any]]:
        '''
            GET /ip
        '''
        try:
            ips = IpModel.getAllIps()
        except r.ConnectionError:
            return {
                'status': 'error',
                'message': 'Couldn\'t connect with the api.'
            }
        return ips
