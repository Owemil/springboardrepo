
from models import db,Tag,PostTag,Post



def db_add(user):   
    db.session.add(user)
    db.session.commit()
    

def db_posttags(form, new_post):
    for id in form:
        tag = Tag.query.get(id)
        new_posttag = PostTag(post_id=new_post.id,tag_id=tag.id)
        db.session.add(new_posttag)
         
def update_post_tags(title, content, tags_form, post):
    if title:
        post.title = title
    if content:
        post.content = content
    if tags_form:
        post_=PostTag.query.filter_by(post_id=post.id).all()
        for posttag in post_:
            db.session.delete(posttag)
        db.session.commit()
        
        for tag_id in tags_form:
            db.session.add(PostTag(post_id=post.id,tag_id=tag_id))   
        
    db.session.commit()

def postTag_delete(post_id):
    post_=PostTag.query.filter_by(post_id=post_id).all()
    for posttag in post_:
        db.session.delete(posttag)
    db.session.commit()