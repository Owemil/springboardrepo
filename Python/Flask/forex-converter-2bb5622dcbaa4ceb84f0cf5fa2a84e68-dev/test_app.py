from app import app
import helpers
from unittest import TestCase

app.config['TESTING'] = True

class forexTestCase(TestCase):
    def test_home(self):
        with app.test_client() as client:
        # can now make requests to flask via `client`
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Forex Converter</h1>', html)

    def test_convert(self):
        with app.test_client() as client:
            resp = client.post('/convert', data={'currcode1':'USD', 'currcode2': 'GBP', 'amount': 50})
            
    
            self.assertEqual(resp.status_code, 302)
            self.assertEqual(resp.location, "/answer")
            

    def test_answer(self):
        with app.test_client() as client:
            resp = client.get('/answer')
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>USD to USD</h1>', html)

    def test_conversion(self):
         forex_data = [1, 'USD', 'USD']

         self.assertEqual(helpers.conversion(forex_data), ({'from':'USD', 'to':'USD', 'amount':1}, 1))

    def test_code_check(self):
        forex_data = ['USD']
        self.assertEqual(helpers.code_check('USD'),forex_data)