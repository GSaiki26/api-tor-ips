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

    @staticmethod
    def delete(ip: str) -> dict[str, str]:
        '''
            DELETE /ip
        '''
        # Get the ip.
        if not (ip):
            return {
                'status': 'error',
                'message': 'Ip not provided.'
            }

        # Send the ip to the api.
        try:
            IpModel.hide(ip)
        except r.ConnectionError:
            return {
                'status': 'error',
                'message': 'Couldn\'t hide the ip.'
            }

        return {
            'status': 'success',
            'message': f'The ip {ip} was hid.'
        }
