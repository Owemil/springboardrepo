import os
from app import app
from unittest import TestCase
from models import db, User, Message

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

with app.app_context():
    db.create_all()

class MessageModelTestCase(TestCase):
    """Test model of messages."""

    def setUp(self):
        """Create test client, add sample data."""
        self.client = app.test_client()

        with app.app_context():
            User.query.delete()
            Message.query.delete()          
            
            db.session.commit()

    def teardown(self):
        with app.app_context():
            db.session.rollback()

    def test_message_model(self):
        with app.app_context():
            testuser = User.signup(username="testuser",
                                        email="test@test.com",
                                        password="testuser",
                                        image_url=None)
            testuser.messages.append(Message(text='lorum ipsum test test'))
            db.session.commit()
            test_msg = Message.query.filter_by(user_id=testuser.id)
            

            self.assertEqual(len(testuser.messages), 1)
            self.assertTrue(test_msg)
            
            
            