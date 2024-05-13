from app import app
from unittest import TestCase
from models import db, User

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False
app.config['TESTING']= True

with app.app_context():
    db.drop_all()
    db.create_all()

class BloglyTestCase(TestCase):

    def setUp(self):
        with app.app_context():
            User.query.delete()

        user = User(first_name='Johnny', last_name='Test', img_url='https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg')
        with app.app_context():
            db.session.add(user)
            db.session.commit()
        self.user_id=user.id
        self.user=user
    def tearDown(self):
        with app.app_context():
            db.session.rollback()

    def test_home(self):
        with app.test_client() as client:
            resp = client.get("/")

            self.assertEqual(resp.status_code, 302)
            self.assertEqual(resp.location, "/users")

    def test_user_list(self):
        with app.test_client() as client:
            resp = client.get('/users')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Johnny Test', html)


    def test_user_info(self):
         with app.test_client() as client:
            resp = client.get(f'/users/{self.user_id}')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Hi Johnny Test</h1>', html)

    def test_edit_user(self):
        with app.test_client() as client:
            resp = client.post(f'/users/{self.user_id}/edit',
                           data={'first_name': 'Billy', 'last_name': 'Fistula', 'img_url':'http://fistpic.com'})
            

            self.assertEqual(resp.status_code, 302)
            self.assertEqual(resp.location, "/users")
            self.assertIn('Billy', User.query.get(self.user_id))
            self.assertIn('Fistula', User.query.get(self.user_id))
            self.assertIn('http://fistpic.com', User.query.get(self.user_id))