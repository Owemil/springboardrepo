from flask import flash
import requests

BASE_URL = 'http://api.exchangerate.host/'
forex_data = []

def code_check(code):
    """
    function for checking if currency code is valid if not flash message
    """
    global forex_data
    res = requests.get(f"{BASE_URL}list", params={'access_key': '2eabeb846c96f552aa35470a59e19226'} )
    currencies = res.json()['currencies']
    if code in currencies:
        forex_data.append(code)
        return forex_data
    else:
        flash(f'Not a valid code:{code}')
        return None
    
def conversion(list):
    """
    function for handling conversion through API
    """
    res = requests.post(f"{BASE_URL}convert", params={
        'access_key': '2eabeb846c96f552aa35470a59e19226',
        'from': list[1],
        'to': list[2],
        'amount': list[0]
        })
    post_data = res.json()['query']
    result = res.json()['result']
    return post_data, result