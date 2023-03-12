# Libs
import requests as r


# Classes
class IpModel:
    @staticmethod
    def getIps() -> list[any]:
        '''
            A method to get the ip list.
        '''
        res = r.get('http://restapi-torips-api:3000/ip')
        return res.json()

    @staticmethod
    def getAllIps() -> list[any]:
        '''
            A method to get all the ip list.
        '''
        res = r.get('http://restapi-torips-api:3000/ip/all')
        return res.json()
