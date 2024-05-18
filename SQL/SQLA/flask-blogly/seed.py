from models import User, Post, db, Tag, PostTag
from app import app

# Create all tables
with app.app_context():
    db.drop_all()
    db.create_all()


# Add users
# Billy = User(first_name='Billy', last_name='Fistula', img_url='https://static.wikia.nocookie.net/legendsofthemultiuniverse/images/a/a0/GrumpyBilly.png/revision/latest?cb=20170419194026')
# Johnny = User(first_name='Johnny', last_name='Test', img_url='https://preview.redd.it/x7udqlx8p3631.jpg?width=640&crop=smart&auto=webp&s=a093117033729209a8aa9a3f75bb3309f3f9b300')
# Tes = User(first_name='Tes', last_name='Tuser', img_url='https://s3.amazonaws.com/kinlane-productions2/bw-icons/bw-test-user.png')

# add posts
post_1 = Post(title='first post!', content='Wow look at all these fistulas.', user_id=1)
post_2 = Post(title='everythings flat?', content='is everything looking flat to anyone else? just me?', user_id=2)
post_3 = Post(title='Dead site??', content="when does this site get good?", user_id=3)
post_4 = Post(title='Seeing odd happenings', content="Things are flatter than before.. I can also see faint objects come towards me getting bigger and then... smaller?", user_id=2)

# add PostTags
post_tag1= PostTag(post_id=1 ,tag_id=5)
post_tag2= PostTag(post_id=1 ,tag_id=1)
post_tag3= PostTag(post_id=2 ,tag_id=5)
post_tag4= PostTag(post_id=2 ,tag_id=2)
post_tag5= PostTag(post_id=2 ,tag_id=3)
post_tag6= PostTag(post_id=3 ,tag_id=5)
post_tag7= PostTag(post_id=3 ,tag_id=4)
post_tag8= PostTag(post_id=3 ,tag_id=3)
post_tag9= PostTag(post_id=4 ,tag_id=6)
post_tag10= PostTag(post_id=4 ,tag_id=3)

# add tags
tag_1 = Tag(name='fun')
tag_2 = Tag(name='scared')
tag_3 = Tag(name='confused')
tag_4 = Tag(name='dead')
tag_5 = Tag(name='first post')
tag_6 = Tag(name='avid poster')
 
# Add new objects to session, so they'll persist
# Commit--otherwise, this never gets saved!
with app.app_context():
    db.session.add(User(first_name='Billy', last_name='Fistula', img_url='https://static.wikia.nocookie.net/legendsofthemultiuniverse/images/a/a0/GrumpyBilly.png/revision/latest?cb=20170419194026'))
    db.session.add(User(first_name='Johnny', last_name='Test', img_url='https://preview.redd.it/x7udqlx8p3631.jpg?width=640&crop=smart&auto=webp&s=a093117033729209a8aa9a3f75bb3309f3f9b300'))
    db.session.add(User(first_name='Tes', last_name='Tuser', img_url='https://s3.amazonaws.com/kinlane-productions2/bw-icons/bw-test-user.png'))
    db.session.add(post_1)
    db.session.add(post_2)
    db.session.add(post_3)
    db.session.add(post_4)
    db.session.add(tag_1)
    db.session.add(tag_2)
    db.session.add(tag_3)
    db.session.add(tag_4)
    db.session.add(tag_5)
    db.session.add(tag_6)
    db.session.commit()

with app.app_context():
    db.session.add(post_tag1)
    db.session.add(post_tag2)
    db.session.add(post_tag3)
    db.session.add(post_tag4)
    db.session.add(post_tag5)
    db.session.add(post_tag6)
    db.session.add(post_tag7)
    db.session.add(post_tag8)
    db.session.add(post_tag9)
    db.session.add(post_tag10)
    db.session.commit()