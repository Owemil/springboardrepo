from boggle import Boggle
from flask import Flask, render_template, session, request, redirect, jsonify, flash
from flask_debugtoolbar import DebugToolbarExtension

boggle_game = Boggle()
app = Flask(__name__)
app.config['SECRET_KEY'] = "123"

debug = DebugToolbarExtension(app)
guesses = []


@app.route('/')
def game_start():
    """
    "home" route for name of game and start button
    responsible for emptying guess list, making new board and setting it into session the same with the highscore and total_plays 
    """
    guesses.empty()
    new_board = boggle_game.make_board()
    session['board'] = new_board
    highscore = session.setdefault('highscore', 0)
    total_plays = session.setdefault('total_plays', 0)
    return render_template('start.html', highscore=highscore, ttl_plays=total_plays)

@app.route('/board')
def board():
    """
    this route is for posting the board onto the page
    """
    board = session['board']
    return render_template('board.html', game=board)

@app.route('/guess', methods=["POST"])
def handle_guess():
    """
    this route handles our guesses by handling a post request and checking if the word is valid
    """
    req = request.get_json()
    word = word_check(req.values())
    
    if word != None:
        validity_check = boggle_game.check_valid_word(session["board"], word)
        return jsonify({"result":validity_check})
    else:
        return 'Oops that word has been guessed already'
    

@app.route('/post-score', methods=["POST"])
def post_score():
    """
    this route handles a post request and runs a function to update the data for highscore and total_plays
    """
    req = request.get_json()
    handle_data(req.values())      
    return 'hi'


def word_check(word):
    # function to help check validity of words
    global guesses
    for word in word:
        if word in guesses:
            return None
        else:
            guesses.append(word)
            return word
        
    
def handle_data(data):
    # function for updating value of highscore and total_plays
    for item in data:
        if isinstance(eval(item), int): 
            if eval(item) > session['highscore']:
                session['highscore'] = eval(item)
                print(session['highscore'])
        if eval(item) == True:
            session['total_plays'] += 1 
   