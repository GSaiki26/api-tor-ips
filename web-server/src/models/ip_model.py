# Libs
import requests as r


# Classes
class IpModel:
    API_URL = 'http://restapi-torips-api:3000'

    @staticmethod
    def getIps() -> list[any]:
        '''
            A method to get the ip list.
        '''
        res = r.get(f'{IpModel.API_URL}/ip')
        return res.json()

    @staticmethod
    def getAllIps() -> list[any]:
        '''
            A method to get all the ip list.
        '''
        res = r.get(f'{IpModel.API_URL}/ip/all')
        return res.json()

    @staticmethod
    def hide(ip: str) -> None:
        '''
            A method to hide some ip from the database.
        '''
        r.delete(f'{IpModel.API_URL}/ip/{ip}')
