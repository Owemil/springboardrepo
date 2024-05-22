from models import db,Pet
from app import app

with app.app_context():
    db.drop_all()
    db.create_all()



cat = Pet(name='kitty', species='Cat', photo_url='https://www.washingtonpost.com/resizer/7tLgbjOZeTsaTiPuxZ1DaxKbWOA=/arc-anglerfish-washpost-prod-washpost/public/FPGDGYJXM56KI5CTHHDX3DN2WQ.jpg', age=2, notes='playful, loves families')
porcupine = Pet(name='spikey', species='Porcupine', photo_url='https://i.natgeofe.com/n/d0c2bc16-95be-4d1f-a1e4-322a0669a7f2/porcupines_thumb.JPG', age=2, notes='playful, loves families, just becareful with quils')
dog = Pet(name='pugsly', species='Dog', photo_url='https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=67773a9d419786091c958b2ad08eae5e', age=2, notes='playful, loves families, snores a lot')

with app.app_context():
    db.session.add(cat)
    db.session.add(porcupine)
    db.session.add(dog)
    db.session.commit()