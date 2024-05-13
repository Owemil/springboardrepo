from flask import flash
from models import db,User


def db_add(user):   
    db.session.add(user)
    db.session.commit()
    return flash(f'User {user} added to DB!')