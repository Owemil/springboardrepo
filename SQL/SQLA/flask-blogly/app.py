"""Blogly application."""

from flask import Flask, redirect,render_template,flash, request
from models import db, connect_db, User, Post, Tag, PostTag
from helpers import db_add, db_posttags,update_post_tags,postTag_delete


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
    flash(f'User {user.first_name} {user.last_name} created!')
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
    tags = Tag.query.all()
    return render_template('post_form.html', user_id=user_id, tags=tags)

# **POST */users/[user-id]/posts/new :*** Handle add form; add post and redirect to the user detail page.
@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def save_post(user_id):
    title = request.form['title']
    content = request.form['content']
    tags_form = request.form.getlist('tags')
    new_post = Post(title=title, content=content, user_id=user_id)
    db_add(new_post)
    db_posttags(tags_form, new_post)
    db.session.commit()
    return  redirect(f'/users/{user_id}')

# **GET */posts/[post-id] :*** Show a post. Show buttons to edit and delete the post.
@app.route('/posts/<int:post_id>')
def post_display(post_id):
    
    post = Post.query.get(post_id)
    user = User.query.get(post.user_id)
    tags = post.tags
    return render_template('post.html', post=post, user=user,tags=tags)

# **GET */posts/[post-id]/edit :*** Show form to edit a post, and to cancel (back to user page).
@app.route('/posts/<int:post_id>/edit')
def post_edit_form(post_id):
    post = Post.query.get(post_id)
    tags = Tag.query.all()
    return render_template('post_edit.html', post=post, tags=tags)

# **POST */posts/[post-id]/edit :*** Handle editing of a post. Redirect back to the post view.
@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def save_edit(post_id):
    post = Post.query.get(post_id)
    title = request.form['title']
    content = request.form['content']
    tags_form = request.form.getlist('tags')

    update_post_tags(title, content, tags_form, post)

    return  redirect(f'/posts/{post_id}')

# **POST */posts/[post-id]/delete :*** Delete the post.
@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def post_delete(post_id):
    postTag_delete(post_id)
    Post.query.filter_by(id= post_id).delete()
    db.session.commit()
    return redirect('/')

# **GET */tags :*** Lists all tags, with links to the tag detail page.
@app.route('/tags')
def all_tags():
    tags = Tag.query.all()
    return render_template('tags.html', tags=tags)

# **GET */tags/[tag-id] :*** Show detail about a tag. Have links to edit form and to delete.
@app.route('/tags/<int:tag_id>')
def tag_view(tag_id):
    tag = Tag.query.get(tag_id)
    return render_template('tag_view.html', tag=tag)

# **GET */tags/new :*** Shows a form to add a new tag.
@app.route('/tags/new')
def new_tag_form():
    return render_template('new_tag_form.html')
# **POST */tags/new :*** Process add form, adds tag, and redirect to tag list.
@app.route('/tags/new', methods=['POST'])
def handle_tag_data():
    new_tag = request.form['new_tag']
    tag = Tag(name=new_tag)
    db.session.add(tag)
    db.session.commit()
    return redirect('/tags')
# **GET */tags/[tag-id]/edit :*** Show edit form for a tag.
@app.route('/tags/<int:tag_id>/edit')
def tag_edit(tag_id):
    tag = Tag.query.get(tag_id)
    return render_template('tag_edit.html', tag=tag)

# **POST */tags/[tag-id]/edit :*** Process edit form, edit tag, and redirects to the tags list.
@app.route('/tags/<int:tag_id>/edit', methods=['POST'])
def handle_tag_edit(tag_id):
    new_name = request.form['tag_edit']
    tag = Tag.query.get(tag_id)
    tag.name = new_name
    db.session.commit()
    return redirect('/tags')

# **POST */tags/[tag-id]/delete :*** Delete a tag.
@app.route('/tags/<int:tag_id>/delete', methods=['POST'])
def tag_delete(tag_id):
    Tag.query.filter_by(id= tag_id).delete()
    db.session.commit()
    return redirect('/tags')

