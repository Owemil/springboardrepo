"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase

from models import db, User, Message, Follows

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data
with app.app_context():
    db.drop_all()
    db.create_all()


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""
        with app.app_context():
            User.query.delete()
            Message.query.delete()
            Follows.query.delete()
            

            self.client = app.test_client()

    def teardown(self):
        with app.app_context():
            db.session.rollback()

    def test_user_model(self):
        """Does basic model work?"""
        with app.app_context():
            u = User(
                email="test@test.com",
                username="testuser",
                password="HASHED_PASSWORD"
            )

            db.session.add(u)
            db.session.commit()

            # User should have no messages & no followers
            self.assertEqual(len(u.messages), 0)
            self.assertEqual(len(u.followers), 0)

    def test_user_model_is_following(self):
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
            u1.following.append(u2)
            u2.following.append(u3)
            db.session.commit()
            

            self.assertTrue(u1.is_following(u2))
            self.assertFalse(u1.is_following(u3))

    def test_user_model_is_followed_by(self):
        with app.app_context():
            u1 = User(
                email="test4@test.com",
                username="testuser4",
                password="HASHED_PASSWORD444"
            )
            u2 = User(
                email="test5@test.com",
                username="testuser5",
                password="HASHED_PASSWORD555"
            )
            u3 = User(
                email="test6@test.com",
                username="testuser6",
                password="HASHED_PASSWORD666"
            )


            db.session.add(u1)
            db.session.add(u2)
            db.session.add(u3)
            u1.following.append(u2)
            u2.following.append(u3)
            db.session.commit()
            

            self.assertTrue(u2.is_followed_by(u1))
            self.assertFalse(u3.is_following(u1))

    def test_user_signup(self):
        with app.app_context():
            test_user = User.signup(username="testuser7",
                                        email="test7@test.com",
                                        password="testuser777",
                                        image_url=None)
            db.session.commit()

            self.assertTrue(test_user)

    def test_user_signup_exception(self):
        with app.app_context():
            with self.assertRaises(Exception):
                test_user = User.signup(username="testuser7",
                                        email="test7@test.com",
                                        password="testuser777",
                                        image_url=None)
                db.session.commit()

    def test_user_authentication(self):
        with app.app_context():
            test_user = User.signup(username="testuser8",
                                        email="test8@test.com",
                                        password="testuser888",
                                        image_url=None)
            db.session.commit()

            self.assertEqual(User.authenticate(username ="testuser8" , password = "testuser888"), test_user)
            self.assertFalse(User.authenticate(username = 'fake1', password = test_user.password))
            self.assertFalse(User.authenticate(username = test_user.username, password = 'fake2'))