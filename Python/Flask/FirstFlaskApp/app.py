from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def root_page():
    return "Welcome to the Home Page!"

@app.route('/hello')
def say_hello():
    return "HELLO THERE!"

@app.route('/search')
def search():
    term = request.args["term"]
    return f"<h1> Search Results for: {term}</h1>"

# @app.route('/post', methods=["POST", "GET"]) 
# def