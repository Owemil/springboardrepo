from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, User, Feedback
from forms import registerForm, loginForm, FeedbackForm
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///auth_exercise"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "abc123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


connect_db(app)

toolbar = DebugToolbarExtension(app)

@app.route('/')
def home():
    """home route. just a redirect"""
    return redirect('/register')

@app.route('/register', methods=['GET', 'POST'])
def register():
    """route to handle registration"""
    form = registerForm()
    if form.validate_on_submit():
       username = form.username.data
       password = form.password.data
       email = form.email.data
       first_name = form.first_name.data
       last_name = form.last_name.data
       
       user = User.register(username, password, email, first_name, last_name)
       db.session.add(user)
       try:
        db.session.commit()
       except IntegrityError:
          form.username.errors.append('Username taken.  Please pick another')
          return render_template('register_form.html', form=form)
       session['user_id'] = user.id
       return redirect(f'/users/{user.username}')

    return render_template('register_form.html', form=form)

@app.route('/login', methods=['GET','POST'])
def login():
    """route ot handle login and user authentication"""
    form= loginForm()
    if form.validate_on_submit():
       username = form.username.data
       password = form.password.data

       user = User.authenticate(username, password)
       if user:
            flash(f"Welcome Back, {user.username}!", "primary")
            session['user_id'] = user.id
            return redirect(f'/users/{user.username}')
       else:
            form.username.errors = ['Invalid username/password.']
    return render_template('login_form.html', form=form)

@app.route('/logout')
def logout():
    """route to handle logouts"""
    session.pop('user_id')
    return redirect('/')

@app.route('/users/<string:username>')
def secret(username):
    """route that handles rendering user page"""
    if session['user_id']:
        logged_in_user = User.query.filter_by(username=username).first()
        feedback = logged_in_user.comments
        return render_template('user_page.html', user=logged_in_user, feedback=feedback)
    return redirect('/login') 

@app.route('/users/<string:username>/delete', methods=['POST'])
def delete_user(username):
    """route for handling deleting a user"""
    user = User.query.filter_by(username=username).first()
    if user.id == session['user_id']:
        session.pop('user_id')
        db.session.delete(user)
        db.session.commit()
        return redirect('/')
    flash("You don't have permission to do that!")
    return redirect('/')

@app.route('/users/<string:username>/feedback/add', methods=['GET','POST'])
def add_feedback(username):
    """ route for add feedback form"""
    user = User.query.filter_by(username=username).first()
    form = FeedbackForm()
    if user.id == session['user_id']:
        if form.validate_on_submit():
            title = form.title.data
            content = form.content.data
            new_feedback = Feedback(title=title, content=content, username=username)
            db.session.add(new_feedback)
            db.session.commit()
            return redirect(f'/users/{username}')
        return render_template('feedback_form.html', form=form)
    flash('You dont have permission to do that!')
    return redirect('/')

@app.route('/feedback/<int:feedback_id>/update', methods=['GET','POST'])
def update_feedback(feedback_id):
    """route for updating feedback form"""
    feedback = Feedback.query.filter_by(id=feedback_id).first()
    form = FeedbackForm(obj=feedback)
    if feedback.user.id == session['user_id']:
        if form.validate_on_submit():
            feedback.title = form.title.data
            feedback.content = form.content.data
            db.session.commit()
            return redirect(f'/users/{feedback.username}')
        return render_template('feedback_form.html', form=form)
    flash("You don't have permission to do that!")
    return redirect('/')

@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):
    """route for deleting feedback form"""
    feedback = Feedback.query.filter_by(id=feedback_id).first()
    if feedback.user.id == session['user_id']:
        db.session.delete(feedback)
        db.session.commit()
        return redirect(f'/users/{feedback.username}')
    flash("You don't have permission to do that!")
    return redirect('/')