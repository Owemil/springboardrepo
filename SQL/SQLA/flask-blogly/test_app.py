from app import app
from unittest import TestCase
from models import db, User, Post

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

        user = User(first_name='Johnny', last_name='Test', img_url='https://preview.redd.it/x7udqlx8p3631.jpg?width=640&crop=smart&auto=webp&s=a093117033729209a8aa9a3f75bb3309f3f9b300')
        post = Post(title='everythings flat?', content='is everything looking flat to anyone else? just me?', user_id=1)
        with app.app_context():
            db.session.add(user)
            db.session.add(post)
            db.session.commit()
        self.user_id=user.id
        self.post_id=post.id
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
            self.assertIn('<h3>Posts</h3>', html)

    def test_edit_user(self):
        with app.test_client() as client:
            resp = client.post(f'/users/{self.user_id}/edit',
                           data={'first_name': 'Billy', 'last_name': 'Fistula', 'img_url':'http://fistpic.com'})
            

            self.assertEqual(resp.status_code, 302)
            self.assertEqual(resp.location, "/users")
            self.assertIn('Billy', User.query.get(self.user_id))
            self.assertIn('Fistula', User.query.get(self.user_id))
            self.assertIn('http://fistpic.com', User.query.get(self.user_id))

    def test_post_display(self):
        with app.test_client() as client:
            resp = client.get(f'/posts/{self.post_id}')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('everythings flat?', html)

    def test_save_edit(self):
        with app.test_client() as client:
            resp = client.post(f'/posts/{self.post_id}/edit',
                           data={'title': 'Hi everyone!', 'content': 'its nice to finally have a normal forum to go to.'})
            

            self.assertEqual(resp.status_code, 302)
            self.assertEqual(resp.location, f"/posts/{self.post_id}")
            self.assertIn('Billy', Post.query.get(self.post_id))
            self.assertIn('Fistula', Post.query.get(self.post_id))
            self.assertIn('http://fistpic.com', Post.query.get(self.post_id))