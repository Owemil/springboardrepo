from models import User, Post, db
from app import app

# Create all tables
with app.app_context():
    db.drop_all()
    db.create_all()


# Add users
Billy = User(first_name='Billy', last_name='Fistula', img_url='https://static.wikia.nocookie.net/legendsofthemultiuniverse/images/a/a0/GrumpyBilly.png/revision/latest?cb=20170419194026')
Johnny = User(first_name='Johnny', last_name='Test', img_url='https://preview.redd.it/x7udqlx8p3631.jpg?width=640&crop=smart&auto=webp&s=a093117033729209a8aa9a3f75bb3309f3f9b300')
Tes = User(first_name='Tes', last_name='Tuser', img_url='https://s3.amazonaws.com/kinlane-productions2/bw-icons/bw-test-user.png')

# add posts
post_1 = Post(title='first post!', content='Wow look at all these fistulas.', user_id=1)
post_2 = Post(title='everythings flat?', content='is everything looking flat to anyone else? just me?', user_id=2)
post_3 = Post(title='Dead site??', content="when does this site get good?", user_id=3)
post_4 = Post(title='Seeing odd happenings', content="Things are flatter than before.. I can also see faint objects come towards me getting bigger and then... smaller?", user_id=2)
 
# Add new objects to session, so they'll persist
# Commit--otherwise, this never gets saved!
with app.app_context():
    db.session.add(Billy)
    db.session.add(Johnny)
    db.session.add(Tes)
    db.session.add(post_1)
    db.session.add(post_2)
    db.session.add(post_3)
    db.session.add(post_4)
    db.session.commit()

