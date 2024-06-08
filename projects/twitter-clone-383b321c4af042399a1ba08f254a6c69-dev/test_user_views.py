import os
from unittest import TestCase

from models import db, connect_db, Message, User, Follows
os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

from app import app, CURR_USER_KEY

with app.app_context():
    db.drop_all()
    db.create_all()

app.config['WTF_CSRF_ENABLED'] = False

class UserViewTestCase(TestCase):
    """Test views for User."""

    def setUp(self):
        """Create test client, add sample data."""
        with app.app_context():
            User.query.delete()
            Message.query.delete()
            Follows.query.delete()
            self.client = app.test_client()

            db.session.commit()

    def teardown(self):
        with app.app_context():
            db.session.rollback()

    def test_list_users(self):
        with app.app_context():
            u1 = User(
                email="test1@test.com",
                username="testuser1",
                password="HASHED_PASSWORD111"
            )
            u2 = User(
                email="test2@test.com",
                username="testuser2",
                password="HASHED_PASSWORD222"
            )
            u3 = User(
                email="test3@test.com",
                username="testuser3",
                password="HASHED_PASSWORD333"
            )
            db.session.add(u1)
            db.session.add(u2)
            db.session.add(u3)
            db.session.commit()

            with self.client as c:
                resp = c.get('/users')
                html = resp.get_data(as_text=True)

                self.assertIn('<p>@testuser1</p>', html)
                self.assertIn('<p>@testuser2</p>', html)
                self.assertIn('<p>@testuser3</p>', html)
                
                self.assertEqual(resp.status_code, 200)

    def test_show_following(self):
        with app.app_context():
            u1 = User(
                email="test1@test.com",
                username="testuser1",
                password="HASHED_PASSWORD111"
            )
            u2 = User(
                email="test2@test.com",
                username="testuser2",
                password="HASHED_PASSWORD222"
            )


            db.session.add(u1)
            db.session.add(u2)
            u1.following.append(u2)
            db.session.commit()

            with self.client as c:
                with c.session_transaction() as sess:
                    sess[CURR_USER_KEY] = u1.id
                
                resp=c.get(f'/users/{u1.id}/following')
                html = resp.get_data(as_text=True)

                self.assertEqual(resp.status_code, 200)
                self.assertIn('<p>@testuser2</p>', html)

    def test_show_following_fail(self):
        with app.app_context():
            u1 = User(
                email="test1@test.com",
                username="testuser1",
                password="HASHED_PASSWORD111"
            )

            db.session.add(u1)
            db.session.commit()

            with self.client as c:
                with c.session_transaction() as sess:
                    sess[CURR_USER_KEY] = None
                
                resp=c.get(f'/users/{u1.id}/following')
                

                self.assertEqual(resp.status_code, 302)
                self.assertEqual(resp.location, "/")
                
    def test_user_followers(self):
        with app.app_context():
            u1 = User(
                email="test1@test.com",
                username="testuser1",
                password="HASHED_PASSWORD111"
            )
            u2 = User(
                email="test2@test.com",
                username="testuser2",
                password="HASHED_PASSWORD222"
            )


            db.session.add(u1)
            db.session.add(u2)
            u1.following.append(u2)
            db.session.commit()

            with self.client as c:
                with c.session_transaction() as sess:
                    sess[CURR_USER_KEY] = u1.id
                
                resp=c.get(f'/users/{u2.id}/followers')
                html = resp.get_data(as_text=True)

                self.assertEqual(resp.status_code, 200)
                self.assertIn('<p>@testuser1</p>', html)

    def test_user_followers_fail(self):
        with app.app_context():
            u1 = User(
                email="test1@test.com",
                username="testuser1",
                password="HASHED_PASSWORD111"
            )

            db.session.add(u1)
            db.session.commit()

            with self.client as c:
                with c.session_transaction() as sess:
                    sess[CURR_USER_KEY] = None
                
                resp=c.get(f'/users/{u1.id}/following')
                

                self.assertEqual(resp.status_code, 302)
                self.assertEqual(resp.location, "/")

    def test_user_followers_fail(self):
        with app.app_context():
            u1 = User(
                email="test1@test.com",
                username="testuser1",
                password="HASHED_PASSWORD111"
            )

            db.session.add(u1)
            db.session.commit()