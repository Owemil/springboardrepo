"""Blogly application."""

from flask import Flask, redirect,render_template,flash, request
from models import db, connect_db, User, Post
from helpers import db_add


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = '1234'

connect_db(app)


@app.route('/')
def home():
    """Home route redirects to users page"""
    return redirect('/users')

@app.route('/users')
def user_list():
    """A list of all current users"""
    user = User.query.all()
    return render_template('users.html', users=user)

@app.route('/users/new')
def new_users():
    """renders template for sign-up page"""
    return render_template('new_user.html')

@app.route('/users/new', methods=['POST'])
def create_user():
    """POST route for handling the creation and adding to the db"""
    first_name = request.form['f_name']
    last_name = request.form['l_name']
    img_url = request.form['img_url']
    user = User(first_name=first_name, last_name=last_name, img_url=img_url)
    db_add(user)
    flash(f'User {user} created!')
    return redirect('/users')

@app.route('/users/<int:user_id>')
def user_info(user_id):
    """Users page"""
    user = User.query.get(user_id)
    post = db.session.query(Post.id, Post.title).filter_by(user_id=user_id).all()
    print(post)
    return render_template('user_page.html', user=user, posts=post)

@app.route('/users/<int:user_id>/edit')
def edit_user_page(user_id):
    """renders form for handling user info editing"""
    user = User.query.get(user_id)
    return render_template('edit.html', user=user)

@app.route('/users/<int:user_id>/edit', methods=['POST'])
def edit_user(user_id):
    """Handles the actual updating and adding to db"""
    user = User.query.get(user_id)
    first_name = request.form['f_name']
    last_name = request.form['l_name']
    img_url = request.form['img_url']
    user.first_name = first_name
    user.last_name = last_name
    user.img_url = img_url
    db.session.commit()
    return redirect('/users')

@app.route('/users/<int:user_id>/delete', methods=['POST'])
def delete_user(user_id):
    """route for deleting user and removing them from db""" 
    User.query.filter_by(id= user_id).delete()
    db.session.commit()
    return redirect('/users')

# **GET */users/[user-id]/posts/new :*** Show form to add a post for that user.
@app.route('/users/<int:user_id>/posts/new')
def new_post_form(user_id):
    return render_template('post_form.html', user_id=user_id)

# **POST */users/[user-id]/posts/new :*** Handle add form; add post and redirect to the user detail page.
@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def save_post(user_id):
    title = request.form['title']
    content = request.form['content']
    new_post = Post(title=title, content=content, user_id=user_id)
    db.session.add(new_post)
    db.session.commit()
    return redirect(f'/users/{user_id}')

# **GET */posts/[post-id] :*** Show a post. Show buttons to edit and delete the post.
@app.route('/posts/<int:post_id>')
def post_display(post_id):
    
    post = Post.query.get(post_id)
    user = User.query.get(post.user_id)

    return render_template('post.html', post=post, user=user)

# **GET */posts/[post-id]/edit :*** Show form to edit a post, and to cancel (back to user page).
@app.route('/posts/<int:post_id>/edit')
def post_edit_form(post_id):
    post = Post.query.get(post_id)
    return render_template('post_edit.html', post=post)

# **POST */posts/[post-id]/edit :*** Handle editing of a post. Redirect back to the post view.
@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def save_edit(post_id):
    post = Post.query.get(post_id)
    title = request.form['title']
    content = request.form['content']
    if title:
        post.title = title
    if content:
        post.content = content
    db.session.commit()
    return redirect(f'/posts/{post_id}')

# **POST */posts/[post-id]/delete :*** Delete the post.
@app.route('/posts/<int:post_id>/delete')
def post_delete(post_id):
    Post.query.filter_by(id= post_id).delete()
    db.session.commit()
    return redirect('/')