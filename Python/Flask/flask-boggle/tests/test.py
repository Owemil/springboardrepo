from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']
app.config['TESTING'] = True

class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    
    def test_start(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Boggle!</h1>', html)

    def test_start_session(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                    change_session['highscore'] = 32
                    change_session['total_plays'] = 2
            resp = client.get("/")
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn('<span>32</span>', html)
            self.assertIn('<span>2</span>', html)

    def test_board(self):
        with app.test_client() as client:
                with client.session_transaction() as sess:
                    sess['board'] =[["D","O","U","G","H"],["D","O","U","G","H"],["D","O","U","G","H"],["D","O","U","G","H"],["D","O","U","G","H"],]
                resp = client.get('/board')
                html = resp.get_data(as_text=True)
                self.assertIn('board', sess)
                self.assertEqual(resp.status_code, 200)
                self.assertIn('<span id="timer">Time:</span>', html)

    def test_guess(self):
        with app.test_client() as client:
                resp = client.post('/guess', 
                               data={'guess': 'bar'})
                html = resp.get_data(as_text=True)
                self.assertEqual(resp.status_code, 200)
                self.assertIn('result: not on board', html)

    def test_post_score(self):
         with app.test_client() as client:
                with client.session_transaction() as sess:
                    sess['highscore']= 9
                    sess['total_plays'] = 2
                resp = client.post('/post-score', 
                               data={ 'score': '12', 'played': 'True' })

                self.assertEqual(resp.status_code, 200)
                self.assertEqual(session['highscore'], 12)
                self.assertEqual(session['total_plays'], 3)