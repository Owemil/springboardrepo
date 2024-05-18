"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

class User(db.Model):
    """User"""

    __tablename__ = "users"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    first_name = db.Column(db.String(50),
                     nullable=False)
    last_name = db.Column(db.String(50),
                     nullable=False)
    img_url = db.Column(db.String())

    posts = db.relationship('Post', backref='users')
    
    def __repr__(self):
        """Show info about user."""

        u = self
        return f"<user {u.id} {u.first_name} {u.last_name}>"
    
class Post(db.Model):
    """Post"""

    __tablename__ = "posts"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    title = db.Column(db.String(50),
                     nullable=False)
    content = db.Column(db.String(500),
                     nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # users = db.relationship('User', backref='posts')
    postTag = db.relationship('PostTag', backref='post')
    tags = db.relationship('Tag', secondary='post_tags', backref='tag_posts')

    def __repr__(self):
        """Show info about a post."""

        p = self
        return f"<post:{p.id} user:{p.user_id} {p.title}>"
    
class PostTag(db.Model):

    __tablename__= 'post_tags'

    post_id=db.Column(db.Integer, db.ForeignKey('posts.id'),primary_key=True,autoincrement=True)
    tag_id=db.Column(db.Integer, db.ForeignKey('tags.id'),primary_key=True)


class Tag(db.Model):

    __tablename__= 'tags'

    id=db.Column(db.Integer, primary_key=True,autoincrement=True)
    name=db.Column(db.String(), nullable=False)
    