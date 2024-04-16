from flask import Flask, request, render_template
from stories import Story, story

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("prompts.html", prompts = story.prompts)

@app.route('/story')
def complete_story():
    return render_template('story.html',story= story.generate(request.args))