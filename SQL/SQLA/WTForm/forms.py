from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SelectField, BooleanField
from wtforms.validators import InputRequired, Optional, URL

class AddPetForm(FlaskForm):
    """form for adding pets"""

    name = StringField("Name",
                       validators=[InputRequired()])
    species = SelectField('Priority Code',
  choices=[('Cat', 'Cat'), ('Dog', 'Dog'), ('Porcupine', 'Porcupine')],
                       validators=[InputRequired()])
    photo_url = StringField("Photo_url",
                        validators=[Optional(), URL()])
    age = FloatField("Age",
                        validators=[Optional()])
    notes = StringField("Notes",
                        validators=[Optional()])
    
class EditPetForm(FlaskForm):
    """form for editing pets"""

    photo_url = StringField("Photo_url",
                        validators=[Optional(), URL()])
    notes = StringField("Notes",
                        validators=[Optional()])
    available = BooleanField('Available',validators=[Optional()])