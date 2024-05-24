"""Flask app for Cupcakes"""
from flask import Flask, jsonify, request, render_template
from models import connect_db, db, Cupcake


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = '1234'

connect_db(app)

def serialize(cupcake):
        """Serialize a cupcake SQLAlchemy obj to dictionary."""
        # I know this should be in the model, I originally had it there. I could not figure out why it wouldnt let me import it though so I moved it here 
        return {
            "id": cupcake.id,
            "flavor": cupcake.flavor,
            "size": cupcake.size,
            "rating": cupcake.rating,
            "image": cupcake.image
    }

@app.route('/')
def home():
     return render_template('home.html')

@app.route('/api/cupcakes')
def get_cupcakes():
    cupcakes = Cupcake.query.all()
    serialized = [serialize(cupcake) for cupcake in cupcakes]
    return jsonify(cupcakes=serialized)

@app.route('/api/cupcakes/<int:id>')
def get_single_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)
    serialized = serialize(cupcake) 
    return jsonify(cupcakes=serialized)

@app.route('/api/cupcakes', methods=['POST'])
def create_cupcakes():
    
    data = request.form
    print(data)
    new_cupcake = Cupcake( flavor=data['flavor'], size=data['size'],rating=data['rating'], image=data['image'] or None)

    db.session.add(new_cupcake)
    db.session.commit()
    serialized = serialize(new_cupcake) 
    return (jsonify(new_cupcake=serialized), 201)

@app.route('/api/cupcakes/<int:id>', methods=['PATCH'])
def update_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)
    cupcake.id= request.json.get('id', cupcake.id)
    cupcake.flavor= request.json.get('flavor', cupcake.flavor)
    cupcake.size= request.json.get('size', cupcake.size)
    cupcake.rating= request.json.get('rating', cupcake.rating)
    cupcake.image= request.json.get('image', cupcake.image)
    db.session.commit()
    return jsonify(cupcake=cupcake.serialize)

@app.route('/api/cupcakes/<int:id>', methods=['DELETE'])
def delete_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)
    db.session.delete(cupcake)
    db.session.commit()
    return jsonify(message="deleted")