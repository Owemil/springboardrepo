from flask import Flask, render_template, redirect
from models import connect_db, db, Pet
from forms import AddPetForm, EditPetForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_adoption'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = '1234'

connect_db(app)

@app.route('/')
def home():
    """home route handles rendering animal information"""
    pets = Pet.query.all()
    return render_template('home.html', pets=pets)

@app.route('/add', methods=["GET", "POST"])
def add_pet_form():
    """route that handles a form for adding new pets"""
    form = AddPetForm()
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        new_pet=Pet(name=name, species=species, photo_url=url, age=age, notes=notes)
        
        db.session.add(new_pet)
        db.session.commit()
    
        return redirect('/')

    else:
        return render_template("add_pet.html", form=form)
    

@app.route('/<int:pet_id>', methods=["GET", "POST"])
def display_pet(pet_id):
    """seperate pages for individual pets"""
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        db.session.commit()
        
        return redirect(f'/')

    else:
        return render_template('display_pet.html', pet=pet, form=form)
    